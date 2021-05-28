import os, sys
import matplotlib.pyplot as plt
import style_transfer
from flask import Flask, url_for, redirect, render_template, request
import os
import time
import numpy as np

app = Flask(__name__)

UPLOAD_FOLDER = './static/image/upload'
style =""

@app.route("/")
def home():
	return render_template("index.html")

@app.route('/about')
def about():
  return render_template('about_page.html')

@app.route('/scrath')
def scrath():
  return render_template('scrath_page.html')

@app.route('/artist')
def artist():
  return render_template('artist_page.html')

@app.route('/artist_page_scc')
def artist_scc():
  fw_text = "입력한 text 문구"
  return render_template('artist_page_scc.html', target = 'image/upload/target.jpg', fw_text=fw_text)

@app.route('/gallery')
def gallery():
  return render_template('gallery_page.html')


@app.route("/scrath_out", methods=['POST'])
def scrath_upload_file():
       file_1 = request.files['file1']
       file_2 = request.files['file2']
       file_1_name = file_1.filename
       file_2_name = file_2.filename
       file_1.save(os.path.join(STATIC_FOLDER+ '/'+'image/'+file_1_name))
       file_2.save(os.path.join(STATIC_FOLDER+ '/'+'image/'+file_2_name))
	
       return render_template('scrath_page_scc.html')

@app.route("/success", methods=['POST'])
def upload_file():
    fw_text = request.form.get('fw_text')
    a = str(np.random.randint(1, 100))
    content = request.files['imageFile0']
    style = request.form.get('value')
    content.save(os.path.join(UPLOAD_FOLDER + '/' + a + 'content.jpg'))

    # load in content and style image
    content = style_transfer.load_image(UPLOAD_FOLDER + '/' + a + 'content.jpg')

    vgg = style_transfer.model()

    # #Resize style to match content, makes code easier
    style = style_transfer.load_image(UPLOAD_FOLDER + '/s' + str(style) + '.jpg', shape=content.shape[-2:])

    target = style_transfer.stylize(content, style, vgg)
    x = style_transfer.im_convert(target)
    plt.imsave(UPLOAD_FOLDER + '/' + a + 'target.png', x)

    return render_template('artist_page_scc.html', target='image/upload/' + a + 'target.png', fw_text=fw_text)
							
if __name__ == '__main__':
    app.run(debug=False, port=8081, host='0.0.0.0') 

    # 참고 1) 파일 저장 위치 (FLASK 문법)
    #      ㄴ templates -html / static : image, css, js
    #     2) 홈페이지는 상단에 동그라미 아이콘 클릭시 시작 : 여러명이 실행 시키면 구동 발생 참고
    #     3) input size = 400 x 400 이하, 풍경 사진 추천(차이가 확명하게 보임)   test
    # pip freeze > requirements.txt
