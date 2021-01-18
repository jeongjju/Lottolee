from pymongo import MongoClient
client = MongoClient("mongodb://localhost:27017/")  
mydatabase = client["lotto"]
mycollection = mydatabase["numbers"] 

# result = mycollection.insert_many(
#     [
#         {'number': i} for i in range(10)
#     ]
# )

result = mycollection.find({
    "$or":[{
        "drwtNo4":{"$in":[37,38]}
    },{
        "drwtNo1":{"$in":[11,13,16,26,38,42]}
    }]
})

# result = mycollection.find({"drwtNo4":37})
# result = mycollection.find()
for record in result:
    print(record)
    # print(record["drwtNo1"])

print(result)