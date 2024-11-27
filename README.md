# SSU_PHOTO

Flask Web service for Style Transfer

## Function
- VGG19(Neural Style Transfer)

## Prerequisites
- PyTorch
- Matplotlib
- Pandas
- Numpy
- Flask

## Setting Virtualenv
You can receive a single-use web server through colab for GPU usage. There is a full description of how to use it.   
(Colab Notebook settings must be GPU)    
- Link : [Web_run](https://colab.research.google.com/github/sejin-sim/SSU_PHOTO/blob/master/%5BTEAM4%5D_Web_run_GPU.ipynb)

## Main & About Page
사용자가 웹사이트에 처음 방문했을 때 보게 되는 메인 페이지와 About 페이지 입니다.

메인 페이지에는 사용자가 바로 SSU PHOTO의 주요기능인 <b>스크래치 기능</b>과 <b>페인트 스타일 기능</b>에 손쉽게 접근할 수 있도록 직관적인 버튼을 배치하여 사용자 경험을 개선했습니다.
About 페이지에는 SSU PHOTO의 간단한 소개와 주요기능을 소개하였습니다.
<p align="center">
  <img src="https://github.com/user-attachments/assets/8d37bdc5-d8b1-4c74-9a86-391d42e98f9c" alt="Main page" width="500">
  <img src="https://github.com/user-attachments/assets/b88bf1a0-f970-402d-b36f-dcef929bea2b" alt="About page" width="500">
</p>

## Gallery Page
갤러리 페이지는 SSU PHOTO의 주요기능을 사용한 사진들의 예시를 보여줍니다.

마우스 오버시 원본 사진이 표시되어, 사용자가 기능을 쉽게 이해 할 수 있습니다.
<p align="center">
  <img src="https://github.com/user-attachments/assets/e8a4d1b6-2136-4413-8fd4-c099075e4c44" alt="Gallery Page" width="500"/ >
  <img src="https://github.com/user-attachments/assets/4d5aee45-b081-4d88-85fe-516e67e5823c" alt="Gallery Page 시연" width="500"/ >
</p>

## Scrath Page
스크래치 기능을 이용할 수 있는 페이지 입니다.

스크래치북을 모티브로 제작되었습니다.

사용자가 업로드한 이미지를 흑백,사용자가 선택한 색상의 이미지로 변환하고, 사용자의 드래그값에 따라 변환된 이미지를 긁어 스크래치북 처럼 색감을 살리는 기능입니다.
- 사용 언어 :HTML, CSS, JavaScript, jQuery

<p align="center">
  <img src="https://github.com/user-attachments/assets/35e33f2b-1e51-40be-8d44-6a3bd53e2a5c" alt="Scrath Page" width="500"/ >
  <img src="https://github.com/user-attachments/assets/23ea2411-077e-4a03-86b6-8ffe3d7fbac7" alt="Scrath Page 시연" width="500"/ >
</p>



## PAINTING STYLE Page
페인트 스타일 기능을 이용할 수 있는 페이지 입니다.

페인팅 스타일 기능은 딥러닝 모델을 이용해 화풍을 변경하는 기능입니다.

딥러닝 종류 중 요즘 각광받고 있는 Style transfer라는 기능으로, 그중 vgg19 model을 파이토치로 사용하였습니다.

<p align="center">
  <img src="https://github.com/user-attachments/assets/8756f767-89ed-4ca1-985d-494dfbfde59e" alt="PAINTING STYLE Page" width="500"/ >
  <img src="https://github.com/user-attachments/assets/c2fb16f7-f294-40b2-a8f2-20c4be214f96" alt="PAINTING STYLE Page 시연" width="500"/ >
</p>


## Style transfer code : [Origin](https://medium.com/udacity-pytorch-challengers/style-transfer-using-deep-nural-network-and-pytorch-3fae1c2dd73e)


