import os
import time
import json
import uuid
import random
import requests
import logging
import sys
import io

from selenium.webdriver.common.by import By

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

class Facebook:
    def __init__(self, url):
        self.url = url
        self.currentLocationIndex = 0

        # Load locations from JSON file
        locations_file = os.path.join("data", "cities.json")
        if not os.path.isfile(locations_file):
            raise FileNotFoundError(f"Locations file not found: {locations_file}")
        
        with open(locations_file, "r", encoding="utf-8") as locations:
            self.locations = json.load(locations)


    def login(self, username, password):
        """Log in to the platform."""
        try:
            logging.info("Attempting to log in.")
            
            if not self.webDriver.driver.get("https://mbasic.facebook.com/"):
                logging.error("Failed to navigate to https://mbasic.facebook.com/")
                return

            if not self.webDriver.type("email", username, by=By.NAME):
                logging.error("Failed to type username.")
                return

            if not self.webDriver.type("pass", password, by=By.NAME):
                logging.error("Failed to type password.")
                return
            
            if not self.webDriver.click("login", by=By.NAME):
                logging.error("Failed to click login button.")
                return

            time.sleep(10)
            logging.info("Login attempt finished.")
        except Exception as e:
            logging.error(f"Login error: {e}")


        
    def add_pictures(self, pictures):
        """Add pictures to the listing."""
        try:
            logging.info("Adding pictures.")
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
            
            if not self.webDriver.type(xpath, pictures_paths_str):
                logging.error("Failed to upload pictures.")
                return False
            return True
        
        except Exception as e:
            logging.error(f"Error adding pictures: {e}")
            raise

    def add_title(self, title):
        """Add title to the listing."""
        try:
            logging.info("Adding title.")
            xpath = "//*[contains(@aria-label, 'Title')]//input"
            if not self.webDriver.type(xpath, title["title"]):
                logging.error("Failed to add title.")
                return False
            return True
        except Exception as e:
            logging.error(f"Error adding title: {e}")
            raise

    def add_price(self, price):
        """Add price to the listing."""
        try:
            logging.info("Adding price.")
            xpath = "//*[contains(@aria-label, 'Price')]//input"
            if not self.webDriver.type(xpath, price["price"]):
                logging.error("Failed to add price.")
                return False
            return True
        except Exception as e:
            logging.error(f"Error adding price: {e}")
            raise
    
    def add_category(self, category):
        """Add category to the listing."""
        try:
            logging.info("Adding category.")
            xpath = "//*[contains(@aria-label, 'Category')]//div/div"
            if not self.webDriver.click(xpath):
                logging.error("Failed to open category dropdown.")
                return False
            
            time.sleep(random.uniform(0.8, 1.8))
            xpath = "//span/div/span[contains(., '"+category["category"]+"')]"
            if not self.webDriver.click(xpath):
                logging.error("Failed to select category.")
                return False
            return True
        except Exception as e:
            logging.error(f"Error adding category: {e}")
            raise
    
    def add_condition(self, condition):
        """Add condition to the listing."""
        try:
            logging.info("Adding condition.")
            xpath = "//label[contains(., 'Condition')]//div/div"
            if not self.webDriver.click(xpath):
                logging.error("Failed to open condition dropdown.")
                return False
            
            time.sleep(random.uniform(0.8, 1.8))
            xpath = "//span[contains(., '"+condition["condition"]+"')]"
            if not self.webDriver.click(xpath):
                logging.error("Failed to select condition.")
                return False
            return True
        except Exception as e:
            logging.error(f"Error adding condition: {e}")
            raise

    def add_description(self, description):
        """Add description to the listing."""
        try:
            logging.info("Adding description.")
            xpath = "//*[contains(@aria-label, 'Description')]//textarea"
            if description is not None and not self.webDriver.type(xpath, description["description"]):
                logging.error("Failed to add description.")
                return False
            return True
        except Exception as e:
            logging.error(f"Error adding description: {e}")
            raise
    
    def add_availability(self, availability):
        """Add availability to the listing."""
        try:
            logging.info("Adding availability.")
            xpath = "//label[contains(., 'Availability')]//div/div"
            if not self.webDriver.click(xpath):
                logging.error("Failed to open availability dropdown.")
                return False
            
            time.sleep(random.uniform(0.8, 1.8))
            xpath = "//span[contains(., '"+availability["availability"]+"')]"
            if not self.webDriver.click(xpath):
                logging.error("Failed to select availability.")
                return False
            time.sleep(random.uniform(0.8, 1.8))
            return True
        except Exception as e:
            logging.error(f"Error adding availability: {e}")
            raise

    def add_tags(self, tags):
        """Add tags to the listing."""
        try:
            logging.info("Adding tags.")
            xpath = "//*[contains(@aria-label, 'Product tags')]//textarea"
            if tags is not None and not self.webDriver.type(xpath, tags["tags"]):
                logging.error("Failed to add tags.")
                return False
            return True
        except Exception as e:
            logging.error(f"Error adding tags: {e}")
            raise
    
    def add_location(self, iter=0):
        """Add location to the listing."""
        try:
            logging.info("Adding location.")
            location = self.locations[self.currentLocationIndex]
            location_str = f"{location['commune_name_ascii']}, {location['wilaya_name_ascii']}, Algeria"
            self.currentLocationIndex += 1

            xpath = "//label[contains(., 'Location')]//input"
            if not self.webDriver.type(xpath, location_str, deleteBefore=True):
                logging.error("Failed to type location.")
                return None
            
            xpath = "//ul[@role='listbox']/li[@role='option'][1]"
            time.sleep(random.uniform(0.8, 1.8))
            if not self.webDriver.click(xpath) and iter < 100:
                return self.add_location(iter=iter + 1)
            
            return location_str
        except Exception as e:
            logging.error(f"Error adding location: {e}")
            raise

    def hide_from_friends(self):
        """Hide listing from friends."""
        try:
            logging.info("Hiding from friends.")
            xpath = "(//input[@type='checkbox'])[2]"
            if not self.webDriver.click(xpath):
                logging.error("Failed to hide listing from friends.")
                return False
            return True
        except Exception as e:
            logging.error(f"Error hiding from friends: {e}")
            raise
        
    def next(self):
        """Click the 'Next' button."""
        try:
            logging.info("Clicking next button.")
            xpath = "//span[contains(., 'Next')]/span"
            if not self.webDriver.click(xpath):
                logging.error("Failed to click next button.")
                return False
            return True
        except Exception as e:
            logging.error(f"Error clicking next button: {e}")
            raise

    def publish(self):
        """Click the 'Publish' button."""
        try:
            logging.info("Clicking publish button.")
            xpath = "//span[contains(., 'Publish')]/span"
            if not self.webDriver.click(xpath):
                logging.error("Failed to click publish button.")
                return False
            return True
        except Exception as e:
            logging.error(f"Error clicking publish button: {e}")
            raise

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
            logging.info(f"Listing {listing['id']} marked as published.")
            return True
        except requests.HTTPError as http_err:
            logging.error(f"HTTP error occurred: {http_err}") 
        except requests.RequestException as err:
            logging.error(f"Request error occurred: {err}")
        except Exception as e:
            logging.error(f"Unexpected error: {e}")
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
            logging.info(f"Listing {listing['id']} marked as unpublished.")
            return True
        except requests.HTTPError as http_err:
            logging.error(f"HTTP error occurred: {http_err}")
        except requests.RequestException as req_err:
            logging.error(f"Request error occurred: {req_err}")
        except Exception as err:
            logging.error(f"An error occurred: {err}")
        return False


    def create_listing(self, listing):
        """Create a listing."""
        self.webDriver.driver.get("https://www.facebook.com/marketplace/create/item")
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
            logging.error(f"Error creating listing: {e}")
            self.listing_unpublished(listing, str(e))