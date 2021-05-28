console.log('filter init hi');
// 출처: https://dev-momo.tistory.com/entry/Javascript-Image-Filter-만들기 [Programming Note]

// canvas 객체 생성
var canvas_color = $('#canvas_color')[0];
var colorCTX = canvas_color.getContext('2d');
var canvas_gray = $('#canvas_gray')[0];
var grayCTX = canvas_gray.getContext('2d');

var isUpload = false;

function drawImageData(image) {
    image.height = (canvas_color.width / image.width) * image.height ;
    image.width = canvas_color.width;

    canvas_color.height = image.height;
    canvas_gray.height = image.height;

    colorCTX.drawImage(image, 0, 0, image.width, image.height);
    grayCTX.drawImage(image, 0, 0, image.width, image.height);
}

// click input button
$('#fileupload').on('change', function (e) {
    var file = e.target.files[0];
    var fileReader = new FileReader();

    fileReader.onload = function (e) {
        var image = new Image();
        image.src = e.target.result;
        image.onload = function () {
            drawImageData(image);
        }
        isUpload = true;
    };
    fileReader.readAsDataURL(file);
});


$('input[name=style]').click (function () {

    if (!isUpload) {
        alert('이미지를 업로드 해주세요!');
        return
    }
    
    // imageData를 가져온다.
    var colorPixels = colorCTX.getImageData(0,0, canvas_color.width, canvas_color.height);
    var grayPixels = grayCTX.getImageData(0,0, canvas_color.width, canvas_color.height);

    // image processing
    var selectColor = $(this).attr('value');
    if (selectColor === 'org') {
    }
    else if (selectColor === 'red') {
        redFilter(colorPixels);
    }
    else if (selectColor === 'blue') {
        blueFilter(colorPixels);
    }
    else if (selectColor === 'green') {
        greenFilter(colorPixels);
    }

    grayscaleFilter(grayPixels);


    // Canvas에 다시 그린다.
    colorCTX.putImageData(colorPixels, 0 , 0);
    grayCTX.putImageData(grayPixels, 0 , 0);

    // Canvas 이미지 서버 저장
    var fileName_color = 'canvas_img_color' + '.jpeg';
    var fileName_gray = 'canvas_img_gray' + '.jpeg';
    saveImage(canvas_color,fileName_color,canvas_gray,fileName_gray);
});

// 캔버스의 이미지 서버 전송
// 출처: https://webisfree.com/2020-08-05/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-canvas-%EC%9A%94%EC%86%8C%EB%A5%BC-%EC%9D%B4%EB%AF%B8%EC%A7%80%EB%A1%9C-%EC%A0%80%EC%9E%A5-%ED%9B%84-%EC%84%9C%EB%B2%84%EC%97%90-ajax%EB%A1%9C-%EC%A0%80%EC%9E%A5%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95
// 출처: https://samanoske.tistory.com/94
function saveImage(canvas1,fileName1,canvas2,fileName2) {
    const imgBase64_1 = canvas1.toDataURL('image/jpeg', 'image/octet-stream');
    const decodImg_1 = atob(imgBase64_1.split(',')[1]);

    const imgBase64_2 = canvas2.toDataURL('image/jpeg', 'image/octet-stream');
    const decodImg_2 = atob(imgBase64_2.split(',')[1]);

    let array1 = [];
    let array2 = [];
    for (let i = 0; i < decodImg_1 .length; i++) {
        array1.push(decodImg_1 .charCodeAt(i));
        array2.push(decodImg_2 .charCodeAt(i));
    }

    const file1 = new Blob([new Uint8Array(array1)], {type: 'image/jpeg'});
    const file2 = new Blob([new Uint8Array(array2)], {type: 'image/jpeg'});
    
    let formData = new FormData();
    formData.append('file1', file1, fileName1);
    formData.append('file2', file2, fileName2);

    $.ajax({
        type: 'POST',
        url: '/scrath_out',
        data: formData,
        enctype: 'multipart/form-data', 
        processData: false,
        contentType: false,
        beforeSend: function() { //로딩이미지 보여주기
            $('#loading').show();
        },
        success : function(response){
            document.write(response);
            $('#loading').hide();
            }
      })
}

// Filters
function grayscaleFilter(pixels) {
    var d = pixels.data;
    for(var i =0; i< d.length; i+=4){
        var r = d[i];
        var g = d[i+1];
        var b = d[i+2];

        var v = 0.2126*r + 0.7152*g + 0.0722*b;  // 보정값
        d[i] = d[i+1] = d[i+2] = v               // RBG 색을 같게 맞추자
    }
    return pixels;
}

function redFilter(pixels) {
    var d = pixels.data;
    for(var i=0; i<pixels.data.length; i+=4 ){
        var r = d[i];
        var g = d[i+1];
        var b = d[i+2];

        // if (r>240&&g>240&&b>240) {
        //     continue;
        // }

        d[i] = r*0.9 + g*0.1 + b*0.1;
        d[i+1] = r*0.2 + g*0.2 + b*0.2;
        d[i+2] = r*0.2 + g*0.2 + b*0.2;

        if (b>r) {
            d[i] = b;
        }
        if (g>r) {
            d[i] = g;
        }
    }
    return pixels;
}

function blueFilter(pixels) {
    var d = pixels.data;
    for(var i=0; i<pixels.data.length; i+=4 ){
        var r = d[i];
        var g = d[i+1];
        var b = d[i+2];

        d[i] = r*0.2 + g*0.2 + b*0.2;
        d[i+1] = r*0.2 + g*0.2 + b*0.2;
        d[i+2] = r*0.1 + g*0.1 + b*0.9;


        if (r>b) {
            d[i+2] = r;
        }
        if (g>b) {
            d[i+2] = g;
        }
    }
    return pixels;
}

function greenFilter(pixels) {
    var d = pixels.data;
    for(var i=0; i<pixels.data.length; i+=4 ){
        var r = d[i];
        var g = d[i+1];
        var b = d[i+2];

        d[i] = r*0.2 + g*0.2 + b*0.2;
        d[i+1] = r*0.1 + g*0.9 + b*0.1;
        d[i+2] = r*0.2 + g*0.2 + b*0.2;


        if (r>g) {
            d[i+1] = r;
        }
        if (b>g) {
            d[i+1] = b;
        }
    }
    return pixels;
}
