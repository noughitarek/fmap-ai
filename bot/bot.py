import requests
import sys
import io
import time
import os
import uuid
import random
import json
from fake_useragent import UserAgent 
from selenium.webdriver.chrome.options import Options as ChromeOptions
from selenium.webdriver.chrome.service import Service as ChromeServices
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium import webdriver

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

class Bot:
    def __init__(self, url, version="v1", https=False):
        scheme = 'https' if https else 'http'
        self.url = f'{scheme}://{url}/api/{version}'
        self.listings = []
        self.webDriver = None
        self.currentLocationIndex = 0
        with open("data\\cities.json", "r", encoding="utf-8") as locations:
            self.locations = json.load(locations)

    def get_new_listings(self):
        """Fetch new listings from the API."""
        url = f'{self.url}/listings/get'
        try:
            response = requests.get(url)
            response.raise_for_status()
            self.listings = response.json()
        except requests.RequestException as e:
            print(f"Request failed: {e}")
        except ValueError:
            print("Response content is not in JSON format.")
            print(response.text.encode('utf-8').decode('utf-8'))
    
    def start_driver(self):
        """Set up and start the Selenium WebDriver."""
        if not hasattr(self, 'currentAccount') or 'id' not in self.currentAccount:
            raise ValueError("currentAccount is not set or does not have an 'id' field")
        
        userDataDir = os.path.abspath(f"data/chrome/{self.currentAccount['id']}/")
        os.makedirs(userDataDir, exist_ok=True)
        chromeOptions = ChromeOptions()
        chromeOptions.add_argument(f"user-data-dir={userDataDir}")
        userAgent = UserAgent().random
        chromeOptions.add_argument(f'user-agent={userAgent}')
        chromeOptions.add_experimental_option("detach", True)
        chromeOptions.add_experimental_option("prefs", {"profile.default_content_setting_values.notifications": 2})
        chromeOptions.add_argument("--disable-infobars")
        chromeOptions.add_argument("start-maximized")
        chromeOptions.add_argument("--encoding=UTF-8")
        chromeOptions.add_argument("--disable-extensions")
        chromeOptions.add_argument("--disable-gpu")
        chromeOptions.add_argument("--log-level=3")
        chromeOptions.add_argument("--disable-search-engine-choice-screen")
        chromeOptions.add_argument("--silent")
        chromeOptions.add_experimental_option("excludeSwitches", ["enable-automation"])
        chromeOptions.add_experimental_option("useAutomationExtension", False)
        chromeOptions.add_argument("--disable-popup-blocking")

        # Path to your chromedriver executable
        chromedriver_path = os.path.abspath("data/chromedriver.exe")
        chromeServices = ChromeServices(executable_path=chromedriver_path)
        self.webDriver = webdriver.Chrome(options=chromeOptions)
    
    def login(self):
        try:
            print("Profile not logged in")
            if self.webDriver.get("https://mbasic.facebook.com/"):
                print("Going to https://mbasic.facebook.com/")

            if self.type("email", self.currentAccount["username"], by=By.NAME):
                print(self.currentAccount["username"]+": typed to screen")

            if self.type("pass", self.currentAccount["password"], by=By.NAME):
                print(self.currentAccount["password"]+": typed to screen")
            
            if self.click("login", by=By.NAME):
                print("Login button clicked")

            time.sleep(10)
        except:
            pass

    def start(self):
        while True:
            try:
                self.run_iter()
                time.sleep(60)
            except:
                print("error")

    def run_iter(self):
        """Main iteration to fetch listings and handle them."""
        self.get_new_listings()
        if len(self.listings) > 0:
            for listing in self.listings:
                if not hasattr(self, 'currentAccount'):
                    self.currentAccount = listing['account']
                    self.start_driver()
                    self.login()
                else:
                    if self.currentAccount != listing['account']:
                        self.stop_driver()
                        self.currentAccount = listing['account']
                        self.start_driver()
                        self.login()
                self.create_listing(listing)
            self.stop_driver()

    def download_picture(self, url, download_path):
        response = requests.get(url)
        if response.status_code == 200:
            with open(download_path, 'wb') as file:
                file.write(response.content)
        else:
            raise Exception(f"Failed to download image from {url}")
        
    def add_pictures(self, pictures):
        print("Adding pictures")
        try:
            download_folder = "download/"
            os.makedirs(download_folder, exist_ok=True)
            
            photos_paths = []
            for picture in pictures:
                photo_url = picture["photo"]["photo"]
                unique_filename = f"{uuid.uuid4()}.jpg" 
                download_path = os.path.join(download_folder, unique_filename)
                self.download_picture(photo_url, download_path)
                photos_paths.append(os.path.abspath(download_path))
            
            pictures_paths_str = "\n".join(photos_paths)
            xpath = "//input[@type='file'][@multiple]"
            self.type(xpath, pictures_paths_str)
            return True
        
        except:
            raise Exception(f"Error adding pictures")

    def add_title(self, title):
        print("Adding title")
        try:
            xpath = "//*[contains(@aria-label, 'Title')]//input"
            self.type(xpath, title["title"])
            return True
        except:
            raise Exception(f"Error adding title")

    def add_price(self, price):
        print("Adding price")
        try:
            xpath = "//*[contains(@aria-label, 'Price')]//input"
            self.type(xpath, price["price"])
            return True
        except:
            raise Exception(f"Error adding price")
    
    def add_category(self, category):
        print("Adding category")
        try:
            xpath = "//*[contains(@aria-label, 'Category')]//div/div"
            self.click(xpath)
            time.sleep(random.uniform(0.8, 1.8))
            xpath = "//span/div/span[contains(., '"+category["category"]+"')]"
            self.click(xpath)
            return True
        except:
            raise Exception(f"Error adding category")
    
    def add_condition(self, condition):
        print("Adding condition")
        try:
            xpath = "//label[contains(., 'Condition')]//div/div"
            self.click(xpath)
            time.sleep(random.uniform(0.8, 1.8))
            xpath = "//span[contains(., '"+condition["condition"]+"')]"
            self.click(xpath)
            return True
        except:
            raise Exception(f"Error adding condition")

    def add_description(self, description):
        print("Adding description")
        try:
            xpath = "//*[contains(@aria-label, 'Description')]//textarea"
            if description is not None:
                self.type(xpath, description["description"])
            return True
        except:
            raise Exception(f"Error adding description")
    
    def add_availability(self, availability):
        print("Adding availability")
        try:
            xpath = "//label[contains(., 'Availability')]//div/div"
            self.click(xpath)
            time.sleep(random.uniform(0.8, 1.8))
            xpath = "//span[contains(., '"+availability["availability"]+"')]"
            self.click(xpath)
            time.sleep(random.uniform(0.8, 1.8))
            return True
        except:
            raise Exception(f"Error adding availability")

    def add_tags(self, tags):
        print("Adding tags")
        try:
            xpath = "//*[contains(@aria-label, 'Product tags')]//textarea"
            if tags is not None:
                self.type(xpath, tags["tags"])
            return True
        except:
            raise Exception(f"Error adding tags")
    
    def add_location(self, iter=0):
        print("Adding location")
        try:
            location = self.locations[self.currentLocationIndex]
            location = location["commune_name_ascii"]+", "+location["wilaya_name_ascii"]+", Algeria"
            self.currentLocationIndex +=1

            xpath = "//label[contains(., 'Location')]//input"
            self.type(xpath, location, deleteBefore=True)
            xpath = "//ul[@role='listbox']/li[@role='option'][1]"

            time.sleep(random.uniform(0.8, 1.8))
            if not self.click(xpath) and iter < 100:
                self.add_location(iter=iter+1)
            return location
        except:
            raise Exception(f"Error adding location")

    def hide_from_friends(self):
        print("Hiding from friends")
        try:
            xpath = "(//input[@type='checkbox'])[2]"
            self.click(xpath)
            return True
        except:
            raise Exception(f"Error adding tags")
        
    def next(self):
        print("Clicking next buutton")
        try:
            xpath = "//span[contains(., 'Next')]/span"
            self.click(xpath)
            return True
        except:
            raise Exception(f"Error adding tags")

    def publish(self):
        print("Clicking publish buutton")
        try:
            xpath = "//span[contains(., 'Publish')]/span"
            self.click(xpath)
            return True
        except:
            raise Exception(f"Error adding tags")

    def listing_published(self, listing, location):
        """Mark listing as published in the backend."""

        url = f"{self.url}/listings/{listing['id']}/"
        data = {
            "state": "published",
            "location": location
        }

        try:
            response = requests.post(url, data=data)
            response.raise_for_status()
            return True
        except requests.HTTPError as http_err:
            print(f"HTTP error occurred: {http_err}") 
        except requests.RequestException as err:
            print(f"Error occurred: {err}")
        except Exception as e:
            print(f"Unexpected error: {e}")
        return False
         
    def listing_unpublished(self, listing, exception):
        """Mark listing as unpublished in the backend."""
        url = f"{self.url}/listings/{listing['id']}/"
        data = {
            "state": "unpublished",
            "exception": exception
        }
        try:
            response = requests.post(url, json=data)
            response.raise_for_status()
            print(f"Listing {listing['id']} marked as unpublished.")
            return True
        except requests.HTTPError as http_err:
            print(f"HTTP error occurred: {http_err}")
        except requests.RequestException as req_err:
            print(f"Request error occurred: {req_err}")
        except Exception as err:
            print(f"An error occurred: {err}")
        return False


    def create_listing(self, listing):
        """Create a listing - placeholder function."""
        self.webDriver.get("https://www.facebook.com/marketplace/create/item")
        try:
            if not self.add_pictures(listing["photos"]):
                raise Exception("Failed to add pictures")
            
            if not self.add_title(listing["title"]):
                raise Exception("Failed to add title")
            
            if not self.add_price(listing["postings_price"]):
                raise Exception("Failed to add price")
            
            if not self.add_category(listing["category"]):
                raise Exception("Failed to add category")
            
            if not self.add_condition(listing["condition"]):
                raise Exception("Failed to add condition")
            
            if not self.add_description(listing["description"]):
                raise Exception("Failed to add description")
            
            if not self.add_availability(listing["availability"]):
                raise Exception("Failed to add availability")
            
            if not self.add_tags(listing["tags"]):
                raise Exception("Failed to add tags")
            
            location = self.add_location()
            if not location:
                raise Exception("Failed to add location")
            
            if not self.hide_from_friends():
                raise Exception("Failed to hide from friends")
            
            if not self.next():
                raise Exception("Failed to proceed to the next step")
            
            if not self.publish():
                raise Exception("Failed to publish listing")
            
            if not self.listing_published(listing, location):
                raise Exception("Failed to confirm listing publication")

        except Exception as e:
            print(str(e))
            self.listing_unpublished(listing, str(e))

    def stop_driver(self):
        """Stop and quit the WebDriver."""
        if self.webDriver:
            self.webDriver.quit()
            self.webDriver = None
    
    def type(self, element, value, by=By.XPATH, deleteBefore=False, asHuman=False):
        try:
            element = self.webDriver.find_element(by, element)
            if deleteBefore:
                element.send_keys(Keys.CONTROL + "a")
                element.send_keys(Keys.DELETE)

            if asHuman:
                for char in value:
                    element.send_keys(char)
                    time.sleep(random.uniform(0.1, 0.2))
            else:
                element.send_keys(value)
            return True
        except:
            return False
    
    def click(self, element, by=By.XPATH, asHuman=False):
        try:
            element = self.webDriver.find_element(by, element)
            if asHuman:
                time.sleep(random.uniform(0.5, 1))
            try:
                element.click()
            except:
                self.webDriver.execute_script("arguments[0].scrollIntoView(true);", element)
                self.webDriver.execute_script("arguments[0].click();", element)
            return True
        except:
            return False

bot = Bot("fmap.ecoshark.org", https=True)
bot.start()
