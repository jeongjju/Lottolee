import re


def strNum(text):
    numbers = re.findall("\d+", text)
    strNum = ""
    for i in range(len(numbers)):
        strNum +=  numbers[i]
    return strNum


text = '123,234원'
print(strNum(text))
# print(text)
# numbers = re.findall("\d+", text)
# strNum = ""
# for i in range(len(numbers)):
#     strNum +=  numbers[i]
# print('strNum',strNum)





