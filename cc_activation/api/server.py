from flask import Flask, request, jsonify, render_template, send_file
from twilio.rest import Client
from os import environ
from string import digits
import json, random, base64, requests
import cc_ocr as ocr

app = Flask(__name__)
app.debug = True

account_sid = "ACe944a6da0dcf73ffc91faae45c95a8d5"
auth_token = "de4b7dbad8a347a2b863e9f8f945b698"
twilio_number = "+18325723251"
client = Client(account_sid, auth_token)

@app.route("/hello")
def hello():
    return "Hello World!"

@app.route("/check_mobile", methods=['GET'])
def check_mobile():
    mobile = request.args.get("mobile")
    with open('./data/users.json', 'r') as f:    
        users = dict(json.load(f))
    if mobile in users:
        auth_code = ''.join(random.choice(digits) for x in range(6))
        users[mobile]['authCode'] = auth_code
        with open('./data/users.json', 'w') as f:
            json.dump(users, f)
        auth_msg = "Your 6 digit verification code is: " + auth_code
        client.messages.create(to=mobile, from_=twilio_number, body=auth_msg)
        addresses = []
        for user in users.keys():
            addresses.append(users[user]["address"])
        print addresses
        while len(addresses) > 3:
            element = random.randint(0,len(addresses)-1)
            print addresses[element]
            if addresses[element] != users[mobile]["address"]:
                addresses.pop(element)
                print len(addresses)
        random.shuffle(addresses)
        return jsonify({
            "success": True,
            "user": users[mobile],
            "addresses": addresses
        })
    return jsonify({
        "success": False,
        "user": ""
    })


@app.route("/get_images", methods=['GET'])
def get_image():
    mobile = request.args.get("mobile")
    with open('./data/users.json', 'r') as f:    
        users = json.load(f)
    try:
        cc_images = [users[mobile]["cc_image"]+".png"]
        cc_numbers = [users[mobile]["cc"]]
        for user in users:
            if user != mobile:
                cc_images.append(users[user]["cc_image"]+".png")
                cc_numbers.append(users[user]["cc"])
            if len(cc_images) > 2:
                break
        return jsonify({
            "success": True,
            "img_nums": cc_images,
            "cc_nums": cc_numbers
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "img_nums": str(e),
            "cc_nums": None
        })


@app.route("/read_card", methods=['POST'])
def get_card_number():
    img_url = request.form['imageUrl']
    raw_data = requests.get(img_url).content
    img64 = base64.b64encode(raw_data)
    card_type, card_number = ocr.get_card_number(img64)
    return jsonify({
        "success": True,
        "card": {
            "type": card_type,
            "number": card_number
        }
    })


@app.route("/check_card", methods=['GET'])
def check_card():
    mobile = request.args.get("mobile")
    card_number = request.args.get("cardNumber")
    cvc = request.args.get("cvc")
    with open('./data/users.json', 'r') as f:    
        users = json.load(f)
    if users[mobile]['card_number'][-4:] == card_number and users[mobile]['cvc'] == cvc:     
        users[mobile]['activated'] = True
        with open('./data/users.json', 'w') as f:    
            json.dump(users, f)
        return jsonify({
            "success": True,
            "message": users[mobile]
        })
    return jsonify({
        "success": False,
        "user": users[mobile]
    })


@app.route("/download.pkpass", methods=['GET'])
def download_pkpass():
    cc = request.args.get("cc")
    try:
        return send_file("./data/pkpass_files/"+cc+".pkpass", mimetype="application/vnd.apple.pkpass", attachment_filename="pscu.pkpass", as_attachment=True)
    except Exception as e:
        return str(e)

if __name__ == "__main__":
    port = int(environ.get('PORT', 8888))
    app.run(host="0.0.0.0", port=port)
    
    
"""
@app.route("/cc_image", methods=['GET'])
def cc_image():
    cc = request.args.get("cc")
    print(cc)
    with open("./data/cc_images/"+cc, "rb") as img_file:
        png_file = base64.b64encode(img_file.read())
    return render_template('cc_image.html', image=png_file)
"""