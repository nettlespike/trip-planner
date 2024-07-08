
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.chrome.service import Service
import time

class WebDriver:

    location_data = {}

    def __init__(self):
 #       service = Service(executable_path=r'/user/bin/chromedriver')
        self.options = webdriver.ChromeOptions()
        s = Service(r"C:\Program Files (x86)\chromedriver.exe")
        self.PATH = "C:/Users/Nettlespike/Documents/GitHub/trip-planner/chrome-win64/chromedriver.exe"
  #      self.options = Options()
        #Overflow
        #Try adding this line if you get the error of chrome chrashed
        #self.options.binary_location = "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe
        self.options.add_argument("--headless")
        self.driver = webdriver.Chrome()

        #self.location_data["location"] = "NA"
        #self.location_data["contact"] = "NA"
        #self.location_data["website"] = "NA"
        self.location_data["Time"] = {"Monday":"NA", "Tuesday":"NA", "Wednesday":"NA", "Thursday":"NA", "Friday":"NA", "Saturday":"NA", "Sunday":"NA"}
    
        
    def get_location_data(self):
        try:
            avg_rating = self.driver.find_element("name","section-star-display")
            total_reviews = self.driver.find_element("name", "section-rating-term")
            address = self.driver.find_element_by_css_selector("[data-item-id='address']")
            phone_number = self.driver.find_element_by_css_selector("[data-tooltip='Copy phone number']")
            website = self.driver.find_element_by_css_selector("[data-item-id='authority']")
        except:
            pass

        try:
            self.location_data["rating"] = avg_rating.text
            self.location_data["reviews_count"] = total_reviews.text[1:-1]
            self.location_data["location"] = address.text
            self.location_data["contact"] = phone_number.text
            self.location_data["website"] = website.text
        except:
            pass    
    def click_open_close_time(self):
        if(len(list(self.driver.find_elements(By.CLASS_NAME, "OyjIsf")))!=0):
            print("yes")
            element = self.driver.find_element(By.CLASS_NAME, "OyjIsf")
            self.driver.implicitly_wait(5)
            ActionChains(self.driver).move_to_element(element).click(element).perform()

    def get_location_open_close_time(self):
        try:
            days = self.driver.find_elements(By.CLASS, "ylHFlf")
            times = self.driver.find_elements(By.CLASS, "mxowUB")

            #days = self.driver.find_element("name","lo7U087hsMA__row-header") # It will be a list containing all HTML section the days names.
            #times = self.driver.find_element("name","lo7U087hsMA__row-interval") # It will be a list with HTML section of open and close time for the respective day.

            day = [a.text for a in days] # Getting the text(day name) from each HTML day section.
            open_close_time = [a.text for a in times] # Getting the text(open and close time) from each HTML open and close time section.

            for i, j in zip(day, open_close_time):
                self.location_data["Time"][i] = j

        except:
            print("NO")
            pass
    def scroll_the_page(self):
        try:
            WebDriverWait(self.driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "section-layout-root"))) # Waits for the page to load.
            pause_time = 2 # Waiting time after each scroll.
            max_count = 5 # Number of times we will scroll the scroll bar to the bottom.
            x = 0

            while(x<max_count):
                scrollable_div = self.driver.find_element_by_css_selector('div.section-layout.section-scrollbox.scrollable-y.scrollable-show') # It gets the section of the scroll bar.
                try:
                    self.driver.execute_script('arguments[0].scrollTop = arguments[0].scrollHeight', scrollable_div) # Scroll it to the bottom.
                except:
                    pass

            time.sleep(pause_time) # wait for more reviews to load.
            x=x+1

        except:
            self.driver.quit()
    def scrape(self, url): # Passed the URL as a variable
        try:
            self.driver.get(url) # Get is a method that will tell the driver to open at that particular URL
            self.driver.execute_script("document.body.style.zoom='75%'")

        except Exception as e:
            self.driver.quit()
            return

        time.sleep(10) # Waiting for the page to load.

        self.click_open_close_time() # Calling the function to click the open and close time button.
        #self.get_location_data() # Calling the function to get all the location data.
        self.get_location_open_close_time() # Calling to get open and close time for each day.

        self.driver.quit() # Closing the driver instance.

        return(self.location_data) # Returning the Scraped Data.
    
#url = "https://www.google.com/maps/search/restaurants+in+waterloo+on/@43.4753232,-80.538145,17z/data=!3m1!4b1?entry=ttu"
url = "https://www.google.com/maps/place/Gladiator+Burger+Waterloo/@43.4740152,-80.536483,16z/data=!3m1!4b1!4m6!3m5!1s0x882bf52ead6440d9:0xfed43c36de6a72a2!8m2!3d43.4740114!4d-80.5316121!16s%2Fg%2F11kq7vzmrv?entry=ttu"
x = WebDriver()
print(x.scrape(url))
