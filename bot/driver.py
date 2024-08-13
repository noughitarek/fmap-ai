import os
import time
import random
import logging
import requests
from fake_useragent import UserAgent
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options as ChromeOptions
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium import webdriver
from selenium.webdriver.common.by import By

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

class Driver:
    def __init__(self, accountID):
        self.accountID = accountID
        self.webDriver = None

    def start_driver(self):
        """Set up and start the Selenium WebDriver."""
        if not self.accountID:
            raise ValueError("Account ID is not set.")

        # Create user data directory if it doesn't exist
        userDataDir = os.path.abspath(f"data/chrome/{self.accountID}/")
        os.makedirs(userDataDir, exist_ok=True)
        
        # Set up Chrome options
        chromeOptions = ChromeOptions()
        chromeOptions.add_argument(f"user-data-dir={userDataDir}")
        
        # Set a random user-agent
        userAgent = UserAgent().random
        chromeOptions.add_argument(f'user-agent={userAgent}')
        
        # Other Chrome options for better performance and stealth
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
        
        # Path to the chromedriver executable
        chromedriver_path = os.path.abspath("data/chromedriver.exe")
        if not os.path.exists(chromedriver_path):
            raise FileNotFoundError(f"Chromedriver not found at path: {chromedriver_path}")
        
        # Initialize the WebDriver
        chromeService = ChromeService(executable_path=chromedriver_path)
        self.webDriver = webdriver.Chrome(service=chromeService, options=chromeOptions)
        logging.info("WebDriver started successfully.")
    
    def download_picture(self, url, download_path):
        """Download an image from a URL."""
        try:
            response = requests.get(url)
            response.raise_for_status()
            with open(download_path, 'wb') as file:
                file.write(response.content)
            logging.info(f"Image downloaded successfully from {url}")
        except requests.exceptions.RequestException as e:
            logging.error(f"Failed to download image: {e}")
            raise
    
        
    def type(self, element, value, by=By.XPATH, deleteBefore=False, asHuman=False):
        """Type text into a web element."""
        try:
            elem = self.webDriver.find_element(by, element)
            if deleteBefore:
                elem.send_keys(Keys.CONTROL + "a")
                elem.send_keys(Keys.DELETE)

            if asHuman:
                for char in value:
                    elem.send_keys(char)
                    time.sleep(random.uniform(0.1, 0.2))
            else:
                elem.send_keys(value)
            logging.info(f"Successfully typed into element {element}")
            return True
        except Exception as e:
            logging.error(f"Error typing into element {element}: {e}")
            return False
    
    def click(self, element, by=By.XPATH, asHuman=False):
        """Click on a web element."""
        try:
            elem = self.webDriver.find_element(by, element)
            if asHuman:
                time.sleep(random.uniform(0.5, 1))
            try:
                elem.click()
            except Exception:
                self.webDriver.execute_script("arguments[0].scrollIntoView(true);", elem)
                self.webDriver.execute_script("arguments[0].click();", elem)
            logging.info(f"Successfully clicked on element {element}")
            return True
        except Exception as e:
            logging.error(f"Error clicking on element {element}: {e}")
            return False
        
    def stop_driver(self):
        """Stop and quit the WebDriver."""
        if self.webDriver:
            self.webDriver.quit()
            self.webDriver = None
            logging.info("WebDriver stopped successfully.")