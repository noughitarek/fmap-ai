import os
import cv2
import random
import time
import logging
import requests
import shutil 
import uuid
from PIL import Image
import imagehash
from facebook import Facebook
from driver import Driver

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

class Bot:
    def __init__(self, url: str, version: str = "v1", https: bool = False) -> None:
        """
        Initialize the Bot with given parameters.

        :param url: Base URL of the API.
        :param version: API version.
        :param https: Whether to use HTTPS or HTTP.
        """
        scheme = 'https' if https else 'http'
        self.url = f'{scheme}://{url}/api/{version}'
        self.currentAccount = None
        self.driver = None
    
    def start(self):
        """Start the bot and enter the main loop."""
        logging.info("Bot started.")
        while True:
            try:
                self.run_iter()
                time.sleep(60)
            except Exception as e:
                logging.error(f"An error occurred in start loop: {e}")
                time.sleep(60)
            
    def handle_create_listings(self):
        """Main iteration to fetch listings and handle them."""
        try:
            url = f'{self.url}/listings/get'
            try:
                response = requests.get(url)
                response.raise_for_status()
                listings = response.json()
                logging.info("Fetched new listings successfully.")

                if listings:
                    for listing in listings:
                        try:
                            self.process_listing(listing)
                        except Exception as e:
                            logging.error(f"Failed to process listing {listing.get('id', 'unknown')}: {e}")
                    if self.driver:
                        self.driver.stop_driver()
                else:
                    logging.info("No new listings.")

            except requests.RequestException as e:
                logging.error(f"Request failed: {e}")
                raise
            except ValueError:
                logging.error("Response content is not in JSON format.")
                logging.error(response.text.encode('utf-8').decode('utf-8'))
                raise

        except Exception as e:
            logging.error(f"An error occurred in run_iter: {e}")
    

        
    def handle_remove_listings(self):
        """Main iteration to fetch listings and handle them."""
        try:
            url = f'{self.url}/listings/remove'

            try:
                response = requests.get(url)
                response.raise_for_status()
                listings = response.json()
                logging.info("Fetched new listings successfully.")

                if listings:
                    for listing in listings:
                        try:
                            if self.currentAccount != listing['account']:
                                if self.driver:
                                    self.driver.stop_driver()
                                self.currentAccount = listing['account']
                                self.driver = Driver(listing['account']["id"])
                                self.driver.start_driver()
                                facebook = Facebook(self.url, self.driver)
                                facebook.login(listing['account']["username"], listing['account']["password"])

                            facebook = Facebook(self.url, self.driver)
                            if facebook.is_blocked:
                                self.driver.webDriver.delete_all_cookies()
                                facebook.login(self.currentAccount["username"], self.currentAccount["password"])
                            
                            facebook.create_listing(listing)
                            time.sleep(random.uniform(3.0, 5.0))
                        except Exception as e:
                            logging.error(f"Failed to process listing {listing.get('id', 'unknown')}: {e}")
                    if self.driver:
                        self.driver.stop_driver()
                else:
                    logging.info("No new listings.")

            except requests.RequestException as e:
                logging.error(f"Request failed: {e}")
                raise
            except ValueError:
                logging.error("Response content is not in JSON format.")
                logging.error(response.text.encode('utf-8').decode('utf-8'))
                raise
        except Exception as e:
            logging.error(f"An error occurred in run_iter: {e}")
    
    def extract_photos(self, video):
        logging.info("Adding pictures.")
        download_folder = "download/videos"
        os.makedirs(download_folder, exist_ok=True)

        video_url = video["video"]
        file_extension = os.path.splitext(video_url)[-1]
        unique_filename = f"{uuid.uuid4()}{file_extension}"
        download_path = os.path.join(download_folder, unique_filename)
        
        self.driver = Driver()
        self.driver.download_file(video_url, download_path)

        videoFile = cv2.VideoCapture(os.path.abspath(download_path))
        if not videoFile.isOpened():
            logging.info("Can't read video.")
            return False
        frames_dir = download_path+"/../../../"+download_path.split(".")[-2]
        os.makedirs(frames_dir)
        frame_count = 0
        success = True
        while success:
            success, frame = videoFile.read()
            if success:
                frame_path = os.path.abspath(frames_dir+"\\"+str("{:0>4d}".format(frame_count))+".jpg")
                cv2.imwrite(frame_path, frame)
                frame_count += 1
        videoFile.release()
        os.remove(os.path.abspath(download_path))

        image_hashes = {}
        path = os.path.abspath(frames_dir)
        for filename in os.listdir(path):
            file_path = os.path.join(path, filename)
            if os.path.isfile(file_path):
                with Image.open(file_path) as img:
                    img_hash = imagehash.average_hash(img)
                for existing_hash, existing_filename in image_hashes.items():
                    similarity_distance = img_hash - existing_hash
                    if similarity_distance <= 5:
                        os.remove(file_path)
                        break
                else:
                    image_hashes[img_hash] = filename

        url = f"{self.url}/photos/{video['photos_group_id']}/add"

        for filename in os.listdir(path):
            file_path = os.path.join(path, filename)
            if os.path.isfile(file_path):
                with open(file_path, 'rb') as photo:
                    photos = {'photo': (filename, photo)}
                    response = requests.post(url, files=photos)
                    if response.status_code == 200:
                        logging.info(f'Successfully uploaded {filename}')
                    else:
                        logging.info(f'Failed to upload {filename}. Status code: {response.status_code}')
                        return
        shutil.rmtree(frames_dir)
        url = f"{self.url}/videos/{video['id']}/published"
        data = {
            "state": "published",
        }

        try:
            response = requests.post(url, data=data)
            response.raise_for_status()
            logging.info(f"Video {video['id']} marked as published.")
            return True
        except requests.HTTPError as http_err:
            logging.error(f"HTTP error occurred: {http_err}") 
        except requests.RequestException as err:
            logging.error(f"Request error occurred: {err}")
        except Exception as e:
            logging.error(f"Unexpected error: {e}")
        return False
            

        
    def handle_video_to_photos(self):
        try:
            url = f'{self.url}/videos/get'
            try:
                response = requests.get(url)
                response.raise_for_status()
                videos = response.json()
                logging.info("Fetched new listings successfully.")

                if videos:
                    for video in videos:
                        try:
                            self.extract_photos(video)
                        except Exception as e:
                            logging.error(f"Failed to process video {video.get('id', 'unknown')}: {e}")
                    if self.driver:
                        self.driver.stop_driver()
                else:
                    logging.info("No new videos.")
            except requests.RequestException as e:
                logging.error(f"Request failed: {e}")
                raise
            except ValueError:
                logging.error("Response content is not in JSON format.")
                logging.error(response.text.encode('utf-8').decode('utf-8'))
                raise
        except Exception as e:
            logging.error(f"An error occurred in handle_video_to_photos: {e}")

    def run_iter(self):
        """Main iteration to fetch and process listings."""
        self.handle_video_to_photos()
        self.handle_create_listings()
        self.handle_remove_listings()

            
    def process_listing(self, listing):
        """
        Process an individual listing and manage account switching.

        :param listing: The listing data to process.
        """
        
        if self.currentAccount != listing['account']:
            if self.driver:
                self.driver.stop_driver()
            self.currentAccount = listing['account']
            self.driver = Driver(listing['account']["id"])
            self.driver.start_driver()
            facebook = Facebook(self.url, self.driver)
            facebook.login(listing['account']["username"], listing['account']["password"])

        facebook = Facebook(self.url, self.driver)
        if facebook.is_blocked:
            self.driver.webDriver.delete_all_cookies()
            facebook.login(self.currentAccount["username"], self.currentAccount["password"])
        
        facebook.create_listing(listing)
        time.sleep(random.uniform(3.0, 5.0))

if __name__ == "__main__":
    bot = Bot("127.0.0.1:8000", https=False)
    bot.start()
