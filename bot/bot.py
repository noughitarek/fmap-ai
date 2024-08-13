import os
import json
import time
import logging
import requests
from facebook import Facebook
from driver import Driver

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

class Bot:
    
    def __init__(self, url, version="v1", https=False):
        scheme = 'https' if https else 'http'
        self.url = f'{scheme}://{url}/api/{version}'
        self.facebook = Facebook(url)
    
    def start(self):
        """Start the bot."""
        logging.info("Bot started.")
        while True:
            try:
                self.run_iter()
                time.sleep(60)
            except Exception as e:
                logging.error(f"An error occurred in start loop: {e}")
                time.sleep(60)
    
    def run_iter(self):
        """Main iteration to fetch listings and handle them."""
        url = f'{self.url}/listings/get'
        try:
            response = requests.get(url)
            response.raise_for_status()
            listings = response.json()
            logging.info("Fetched new listings successfully.")
        except requests.RequestException as e:
            logging.error(f"Request failed: {e}")
            return  
        except ValueError:
            logging.error("Response content is not in JSON format.")
            logging.error(response.text.encode('utf-8').decode('utf-8'))
            return  
        
        if listings:
            for listing in listings:
                try:
                    self.process_listing(listing)
                except Exception as e:
                    logging.error(f"Failed to process listing {listing.get('id', 'unknown')}: {e}")
            if self.webDriver:
                self.webDriver.stop_driver()
        else:
            logging.info("No new listings.")

            
    def process_listing(self, listing):
        """Process individual listing and manage account switching."""
        if self.currentAccount != listing['account']:
            if self.webDriver:
                self.webDriver.stop_driver()
            self.currentAccount = listing['account']
            self.webDriver = Driver(listing['account']["id"])
            self.webDriver.start_driver()
            self.facebook.login(listing['account']["username"], listing['account']["password"])
        
        self.facebook.create_listing(listing)

<<<<<<< HEAD
if __name__ == "__main__":
    bot = Bot("127.0.0.1:8000", https=False)
    bot.start()
=======
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

        url = f"{self.url}/listings/{listing['id']}/published"

        try:
            response = requests.get(url)
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
        url = f"{self.url}/listings/{listing['id']}/unpublished"
        try:
            response = requests.post(url)
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
>>>>>>> 484b1227fc7899f0a40c5ef8bfb2f97a1e058f5d
