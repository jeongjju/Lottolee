from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time 
import urllib.request
from pymongo import MongoClient
import re

# DB
client = MongoClient("mongodb://localhost:27017/")  
mydatabase = client["lotto"]
mycollection = mydatabase["numbers"] 

driver = webdriver.Chrome()

def strNum(text):
    numbers = re.findall("\d+", text)
    strNum = ""
    for i in range(len(numbers)):
        strNum +=  numbers[i]
    return strNum



for no in range(1,945):
    driver.get("https://dhlottery.co.kr/gameResult.do?method=byWin&drwNo="+str(no))
    print(str(no) + "회")
    lottoNumbers = []
    lottoInfo = []
    # 당첨번호
    lottoNumbers.append(int(driver.find_element_by_xpath("//*[@id=\"article\"]/div[2]/div/div[2]/div/div[1]/p/span[1]").text))
    lottoNumbers.append(int(driver.find_element_by_xpath("//*[@id=\"article\"]/div[2]/div/div[2]/div/div[1]/p/span[2]").text))
    lottoNumbers.append(int(driver.find_element_by_xpath("//*[@id=\"article\"]/div[2]/div/div[2]/div/div[1]/p/span[3]").text))
    lottoNumbers.append(int(driver.find_element_by_xpath("//*[@id=\"article\"]/div[2]/div/div[2]/div/div[1]/p/span[4]").text))
    lottoNumbers.append(int(driver.find_element_by_xpath("//*[@id=\"article\"]/div[2]/div/div[2]/div/div[1]/p/span[5]").text))
    lottoNumbers.append(int(driver.find_element_by_xpath("//*[@id=\"article\"]/div[2]/div/div[2]/div/div[1]/p/span[6]").text))

    # 보너스번호
    lottoInfo.append(int(driver.find_element_by_xpath("//*[@id=\"article\"]/div[2]/div/div[2]/div/div[2]/p/span").text))

    # 1게임당 당첨금액
    lottoInfo.append(int(strNum(driver.find_element_by_xpath("//*[@id=\"article\"]/div[2]/div/table/tbody/tr[1]/td[4]").text)))
    lottoInfo.append(int(strNum(driver.find_element_by_xpath("//*[@id=\"article\"]/div[2]/div/table/tbody/tr[2]/td[4]").text)))
    lottoInfo.append(int(strNum(driver.find_element_by_xpath("//*[@id=\"article\"]/div[2]/div/table/tbody/tr[3]/td[4]").text)))
    lottoInfo.append(int(strNum(driver.find_element_by_xpath("//*[@id=\"article\"]/div[2]/div/table/tbody/tr[4]/td[4]").text)))
    lottoInfo.append(int(strNum(driver.find_element_by_xpath("//*[@id=\"article\"]/div[2]/div/table/tbody/tr[5]/td[4]").text)))

    # # 당첨게임 수
    lottoInfo.append(int(strNum(driver.find_element_by_xpath("//*[@id=\"article\"]/div[2]/div/table/tbody/tr[1]/td[3]").text)))
    lottoInfo.append(int(strNum(driver.find_element_by_xpath("//*[@id=\"article\"]/div[2]/div/table/tbody/tr[2]/td[3]").text)))
    lottoInfo.append(int(strNum(driver.find_element_by_xpath("//*[@id=\"article\"]/div[2]/div/table/tbody/tr[3]/td[3]").text)))
    lottoInfo.append(int(strNum(driver.find_element_by_xpath("//*[@id=\"article\"]/div[2]/div/table/tbody/tr[4]/td[3]").text)))
    lottoInfo.append(int(strNum(driver.find_element_by_xpath("//*[@id=\"article\"]/div[2]/div/table/tbody/tr[5]/td[3]").text)))

    # # 등위별 총 당첨금액
    lottoInfo.append(int(strNum(driver.find_element_by_xpath("//*[@id=\"article\"]/div[2]/div/table/tbody/tr[1]/td[2]/strong").text)))
    lottoInfo.append(int(strNum(driver.find_element_by_xpath("//*[@id=\"article\"]/div[2]/div/table/tbody/tr[2]/td[2]/strong").text)))
    lottoInfo.append(int(strNum(driver.find_element_by_xpath("//*[@id=\"article\"]/div[2]/div/table/tbody/tr[3]/td[2]/strong").text)))
    lottoInfo.append(int(strNum(driver.find_element_by_xpath("//*[@id=\"article\"]/div[2]/div/table/tbody/tr[4]/td[2]/strong").text)))
    lottoInfo.append(int(strNum(driver.find_element_by_xpath("//*[@id=\"article\"]/div[2]/div/table/tbody/tr[5]/td[2]/strong").text)))

    # # 총판매금액
    lottoInfo.append(int(strNum(driver.find_element_by_xpath("//*[@id=\"article\"]/div[2]/div/ul/li[2]/strong").text)))

    # # 날짜
    lottoInfo.append(int(strNum(driver.find_element_by_xpath("//*[@id=\"article\"]/div[2]/div/div[2]/p").text)))

    lottoNumbers.sort()
    
    
    mycollection.insert_many(
        [
            {'drwNo':no,'drwtNo1':lottoNumbers[0],'drwtNo2':lottoNumbers[1],'drwtNo3':lottoNumbers[2],'drwtNo4':lottoNumbers[3],
            'drwtNo5':lottoNumbers[4],'drwtNo6':lottoNumbers[5],'bnusNo':lottoInfo[0],
            'firstWinamnt':lottoInfo[1],'secondWinamnt':lottoInfo[2],'thirdWinamnt':lottoInfo[3],'fourthWinamnt':lottoInfo[4],'fifthWinamnt':lottoInfo[5],
            'firstPrzwnerCo':lottoInfo[6],'secondPrzwnerCo':lottoInfo[7],'thirdPrzwnerCo':lottoInfo[8],'fourthPrzwnerCo':lottoInfo[9],'fifthPrzwnerCo':lottoInfo[10],
            'firstTotWinamnt':lottoInfo[11],'secondTotWinamnt':lottoInfo[12],'thirdTotWinamnt':lottoInfo[13],'fourthTotWinamnt':lottoInfo[14],'fifthTotWinamnt':lottoInfo[15],
            'totSellamnt':lottoInfo[16],'drwNoDate':lottoInfo[17]
            }
        ]
    )
    print('lottoNumbers',lottoNumbers)
    print('lottoInfo',lottoInfo)



# SCROLL_PAUSE_TIME = 0.5

# # Get scroll height
# last_height = driver.execute_script("return document.body.scrollHeight")

# while True:
#     # Scroll down to bottom
#     driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

#     # Wait to load page
#     time.sleep(SCROLL_PAUSE_TIME)

#     # Calculate new scroll height and compare with last scroll height
#     new_height = driver.execute_script("return document.body.scrollHeight")
#     if new_height == last_height:
#         driver.find
#     last_height = new_height

 
# images = driver.find_elements_by_css_selector(".rg_i.Q4LuWd")
# count = 1
# for image in images:
#     image.click()
#     time.sleep(3)
#     imgURL = driver.find_element_by_css_selector(".n3VNCb").get_attribute("src")
#     urllib.request.urlretrieve(imgURL, str(count)+".jpg")
#     count += 1
# assert "Python" in driver.title
# elem = driver.find_element_by_name("q")
# elem.clear()
# elem.send_keys("pycon")
# elem.send_keys(Keys.RETURN)
# assert "No results found." not in driver.page_source
# driver.close() 