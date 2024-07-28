import csv
import random
from datetime import datetime,timedelta


len = 500

reviews = ["I recently dined here and had a fantastic experience. The atmosphere was inviting, and the staff were friendly and attentive. The menu had a great variety, and everything we ordered was delicious and well-prepared. Highly recommend and will definitely return!",
           "Had an amazing meal at this restaurant. The ambiance was cozy, and the service was excellent. The food was flavorful and beautifully presented. A wonderful dining spot that I highly recommend!",
           "This restaurant offers a delightful dining experience. The decor is stylish, and the staff are very accommodating. The dishes were fresh and tasty. I highly recommend this place and look forward to coming back.",
           "Enjoyed a great dinner here. The atmosphere was pleasant, and the staff were courteous. The menu had something for everyone, and our meals were delicious. Will definitely visit again!",
           "Fantastic dining experience! The ambiance was warm and inviting, the staff were attentive, and the food was superb. Highly recommend this place and can't wait to return!",
           "Dined here recently and loved it. The setting was charming, and the service was top-notch. The food was flavorful and well-prepared. Definitely a place I recommend and will revisit!",
           "This restaurant is a gem. The atmosphere is elegant, the staff are friendly, and the food is exceptional. A highly recommended spot for a great meal. Will be back for sure!",
           "Had a lovely meal here. The ambiance was relaxing, the service was excellent, and the food was delicious. Highly recommend this restaurant and will definitely return!",
           "Great dining experience! The decor was modern and stylish, the staff were attentive, and the food was fantastic. A wonderful place to eat that I highly recommend!",
           "Recently dined here and had a wonderful time. The atmosphere was cozy, the service was excellent, and the food was amazing. Highly recommend and will definitely be back!",
           "Pog",
           "Great time!",
           "Great food",
           "Great service!",
           "Good food for the price",
           "Bringing my gf here next time hehe", #15
            "I dined here recently and had a pleasant experience. The atmosphere was nice, and the staff were generally attentive. The menu had a decent variety, and the food was good. Overall, it was an enjoyable visit.",
               "This restaurant was quite nice. The ambiance was comfortable, and the service was satisfactory. The food was decent and met our expectations. It's a good place for a casual meal.",
               "My experience here was fairly positive. The setting was pleasant, and the staff were polite. The menu offered a reasonable selection, and the dishes were fine. A solid option for dining out.",
               "Had an okay meal here. The atmosphere was pleasant, and the service was fine. The food was average but decent overall. It's a decent spot for a meal.",
               "Dining here was a decent experience. The ambiance was fine, and the staff were friendly. The food was good, though not exceptional. It's a solid choice for a meal.",
               "Dining here was a decent experience. The ambiance was fine, and the staff were friendly. The food was good, though not exceptional. It's a solid choice for a meal.",
               "Enjoyed a meal here recently. The setting was nice, and the service was acceptable. The food was decent, though not particularly memorable. A reasonable choice for dining out.",
               "My visit to this restaurant was pleasant. The atmosphere was comfortable, and the staff were friendly. The food was good, though not outstanding. It's a nice place to dine.",
               "This restaurant was a good experience. The ambiance was nice, and the service was fine. The food was decent, with a good variety on the menu. A solid place for a meal.",
               "Had a reasonable meal here. The setting was nice, and the staff were polite. The food was good, though not remarkable. It's a decent spot for a casual meal." #9
            "I dined here recently and was disappointed. The atmosphere was lackluster, and the staff were inattentive. The menu lacked variety, and the food was mediocre at best. Not a place I would recommend.",
               "This restaurant was a letdown. The ambiance was dull, and the service was slow. The food was bland and not worth the price. I wouldn’t dine here again.",
               "My experience here was underwhelming. The setting was uninspiring, and the staff seemed disinterested. The menu was limited, and the dishes were poorly executed. Not a memorable visit.",
               "Had an unpleasant meal here. The atmosphere was uninviting, and the service was subpar. The food was tasteless and poorly prepared. I won’t be coming back.",
               "Dining here was disappointing. The ambiance was drab, and the staff were unhelpful. The food was unimpressive and not enjoyable. I wouldn’t recommend this place.",
               "This restaurant failed to impress. The decor was dated, and the service was lacking. The food was mediocre and did not meet expectations. A place I would avoid.",
               "Hate this place lololol",
               "My visit here was disappointing. The setting was unappealing, and the staff were indifferent. The food was bland and poorly presented. I wouldn’t dine here again.",
               "This restaurant was a disappointment. The atmosphere was uninviting, and the service was poor. The food was tasteless and overpriced. Not a place I would recommend.",
               "Found a fly in my food",
               "Kicked me out for NOTHING",
               "Owner is a terrible person",
               "Had a poor experience here. The setting was lackluster, and the staff were inattentive. The food was bland and not enjoyable. I won’t be returning.",
               "My meal here was disappointing. The ambiance was dull, and the service was slow. The food was mediocre and not worth the visit. I wouldn’t recommend this restaurant."
               ] #13


uid_avoid = [23, 30, 51, 78,126,130,131,194,208,237,278,300,306,346,381]

def gen_uid():
    uid = random.randrange(1,401)
    for i in uid_avoid:
        if(uid == i):
            return gen_uid()
    return uid

def gen_date(min_year=2005, max_year=datetime.now().year):
    start = datetime(min_year,1,1,00,00,00)
    years = max_year - min_year + 1
    end = start + timedelta(days=365*years)
    mydate = start + (end - start) * random.random()
    formatted = mydate.strftime("%Y-%m-%d")
    return formatted

mydict = []

for i in range(len):
    poi_code = random.randrange(1, 237)
    experience_rating = random.randrange(0, 10)
    revisit_rating = random.randrange(0,3) 
    rn = random.randrange(15, 38)
    #Bad -> 0,1,2
    #Normal ->3,4,5
    #Good -> 6,7,8,9
    if experience_rating <= 2:
        revisit_rating = random.randrange(0, 3)

    elif experience_rating <= 5:
        experience_rating = random.randrange(3,6)
        revisit_rating = random.randrange(3,6)
        rn = random.randrange(3, 22)
    else:
        experience_rating = random.randrange(4,6)
        revisit_rating = random.randrange(4,6)
        rn = random.randrange(0,15)

    

    mydict.append({'date': gen_date(),
                 'experience_rating': experience_rating,
                 'would_revisit_rating': revisit_rating,
                 'comment': reviews[rn],
                 'cus_no': gen_uid(),
                 'poi_code': poi_code})

fields = ['date', 'experience_rating', 'would_revisit_rating', 'comment', 'cus_no','poi_code']
filename = "trip_reviews.csv"

with open(filename, 'w',newline='') as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames=fields)
    writer.writeheader()
    
    writer.writerows(mydict)



