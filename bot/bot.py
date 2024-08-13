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

if __name__ == "__main__":
    bot = Bot("127.0.0.1:8000", https=False)
    bot.start()