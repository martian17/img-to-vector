var toGrayscale = function(imgdata){
    var data0 = imgdata.data;
    var width = imgdata.width;
    var height = imgdata.height;
    var data = new Uint8ClampedArray(width*height);
    for(var i = 0; i < height; i++){
        for(var j = 0; j < width; j++){
            var sum = 0;
            var idx0 = (i*width+j)*4;
            var idx = (i*width+j);
            sum += data0[idx0+0];
            sum += data0[idx0+1];
            sum += data0[idx0+2];//averages out the rgb
            data[idx] = Math.floor(sum/3);
        }
    }
    return data[idx];
};

var generateGaussianKernel = function(k){
    var n = k*2+1;
    var arr = [];
    var sigma2 = 1;
    for(var i  = 0; i < n; i++){
        for(var j  = 0; j < n; j++){
            //1/(σ√(2π))*e^(-1/2*((x-μ)/σ)^2)
            //0,1,2
            var ii = Math.abs(i-k);
            var jj = Math.abs(j-k);
            arr[i*n+j] = 1/(2*Math.PI*sigma2)*(Math.E**(((i-k)**2+(j-k)**2)/(-2*sigma2)));
        }
    }
    return arr;
};



var applyBlur = function(data,width,height,r){
    var kernel = generateGaussianKernel(r);
    var
    console.log(kernel);
    for(var i = 0; i < height; i++){
        for(var j = 0; j < width; j++){
            var sum = 0;
            var idx0 = (i*width+j)*4;
            var idx = (i*width+j);
            sum += data0[idx0+0];
            sum += data0[idx0+1];
            sum += data0[idx0+2];//averages out the rgb
            data[idx] = Math.floor(sum/3);
        }
    }
};

var calcGradient = function(data,width,height){
    for(var i = 0; i < height; i++){
        for(var j = 0; j < width; j++){
            var sum = 0;
            var idx0 = (i*width+j)*4;
            var idx = (i*width+j);
            sum += data0[idx0+0];
            sum += data0[idx0+1];
            sum += data0[idx0+2];//averages out the rgb
            data[idx] = Math.floor(sum/3);
        }
    }
};



var getEdgesFromImageData = function(imgdata){
    var width = imgdata.width;
    var height = imgdata.height;
    var gray = toGrayscale(imgdata);
    applyBlur(gray,width,height,2);//side effect function
    var gradient = calcGradient(gray,width,height);
}

var detectEdges = function(){
    
}