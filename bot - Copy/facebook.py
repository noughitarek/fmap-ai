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



    def remove_listings(self, accountID):
        self.driver.webDriver.get("https://www.facebook.com/"+accountID+"/allactivity?activity_history=false&category_key=MARKETPLACELISTINGS&manage_mode=false&should_load_landing_page=false")    
        time.sleep(random.uniform(1.1, 1.9))
        while True: 
            time.sleep(random.uniform(random.uniform(0.1,0.4), random.uniform(0.5, 0.9)))
            xpath = "/html/body/div[1]/div/div[1]/div/div[3]/div/div/div/div[1]/div[1]/div[2]/div/div/div/div/div/div[2]/div[2]/div/div[2]/div/i"
            if self.driver.webDriver.click(xpath):
                xpath = "/html/body/div[1]/div/div[1]/div/div[3]/div/div/div/div[2]/div/div/div[1]/div[1]/div/div/div/div/div/div/div[1]/div/div/div[2]/div/div/span"
                time.sleep(random.uniform(random.uniform(0.1,0.2), random.uniform(0.5, 0.7)))   
                self.driver.webDriver.click(xpath)
                xpath = "/html/body/div[1]/div/div[1]/div/div[4]/div/div/div[1]/div/div[2]/div/div/div/div/div/div/div[3]/div/div/div/div/div[1]/div/div/div[1]/div/span/span"
                time.sleep(random.uniform(random.uniform(0.1,0.3), random.uniform(0.5, 0.8)))  
                self.driver.webDriver.click(xpath)
            else:
                break

    