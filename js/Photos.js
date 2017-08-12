//获取元素函数
function getEle(name,parent){
	var t = name.substr(0,1);
	var s = name.substr(1);
	parent = parent || document;
	if(t=='#'){
		return document.getElementById(s);
	}else if(t=='.'){
		return parent.getElementsByClassName(s);
	}else{
		return parent.getElementsByTagName(name);
	}
}
var checkLight = getEle('.checkLight')[0];
var photosFoot = getEle('.photosFoot')[0];
var photosBody = getEle('.photosBody')[0];
var album = getEle('.album',photosBody);
var albums = getEle('dl',photosBody);
var photoType = getEle('.photoType')[0];
var photoType1_con = getEle('.photoType1_con')[0];
var photoType_close = getEle('.photoType_close')[0];
var photoType1_conLeft = getEle('.photoType1_conLeft')[0];
var photoType1SmallPic = getEle('.photoType1SmallPic')[0];
var photoType1ScrollBarBar = getEle('.photoType1ScrollBarBar')[0];
var photoType1_conRight = getEle('.photoType1_conRight')[0];
var photoType1_conRight_ul = getEle('ul',photoType1_conRight)[0];
var conRightNext = getEle('.conRightNext')[0];
var conRightPrev = getEle('.conRightPrev')[0];
var photoType2_con = getEle('.photoType2_con')[0];
var photoType2_conBox = getEle('.photoType2_conBox')[0];
var photoType3_con = getEle('.photoType3_con')[0];
var photoType3_con_ul = getEle('ul',photoType3_con)[0];
var photoType3_con_lis = getEle('li',photoType3_con);
var photoType3_con_img = getEle('img',photoType3_con);
var photoType3Num = 0;
conRightNext.check = true;
conRightNext.num = 0;
var num = 3;
var check = true;
var index;
var arrData = [];
var n1 = 0;
var n2 = 0;
var maxN = 0;
var maxn = 0;
var photoTypeTwo_l = 0;
var photoTypeTwo_t = 0;
var photoTypeTwo_num = 0;
var photoTypeThree_l = document.body.clientWidth*0.95*0.0677;
//开关灯事件
checkLight.check = true;
checkLight.onclick = function(){
	if(checkLight.check){
		console.log(photosBody)
		photosBody.style.background = '#333333';
		photosFoot.style.background = '#d6d6d6';
		checkLight.check = false;
	}else{
		photosBody.style.background = '';
		photosFoot.style.background = '';
		checkLight.check = true;
	}
	
}
//选中相册前置/点击动画效果
for(var i=0;i<albums.length;i++){
	albums[i].onmouseenter = function(){
		this.timer = setTimeout(function(_this){
			_this.style.zIndex = ++num;
		},100,this)
	}
	albums[i].onmouseleave = function(){
		clearTimeout(this.timer) 
	}
	albums[i].index = i;
	albums[i].onclick = function(){
		photoType1SmallPic.innerHTML = '';
		photoType1_conRight.lastElementChild.innerHTML = '';
		index = this.index;
		check = false;
		var l = this.parentElement.offsetLeft+this.offsetLeft-document.body.offsetWidth*0.025
		this.style.left = '-'+l/this.getBoundingClientRect().width*100+'%';
		this.style.top = '-580%';
		this.style.transform = 'rotate(90deg)';
		this.style.width = '332%';
		this.style.height = '570%';
		this.style.opacity = '0.3';
		photoType.style.width = document.body.clientWidth*0.95+'px';
		photoType.style.height = document.body.clientHeight*0.9+'px';
		photoTypeCon(index);
		this.timer2 = setTimeout(function(_this){
			photoType.style.display = 'block';
			_this.style.display = 'none';
		},500,this)
	}
}
for(var i=0;i<album.length;i++){
	album[i].onmouseleave = function(){
		if(check){
			num = 3;
			for(var i=0;i<this.children.length;i++){
				this.children[i].style.zIndex = '';
			}
		}
	}
}
//关闭照片墙
photoType_close.onclick = function(){
	photoType.style.display = '';
	photoType1_con.style.display = '';
	photoType1SmallPic.innerHTML = '';
	photoType1_conRight_ul.innerHTML = '';
	photoType2_con.style.display = '';
	photoType2_conBox.innerHTML = '';
	photoType3_con.style.display = '';
	check = true;
	num = 3;
	conRightNext.num = 0;
	albums[index].style.cssText = '';
	console.log(albums[index])
}
//照片墙内容渲染
function photoTypeCon(index){
	//获取对应数据
	if(Math.floor(index/3)==0){
		arrData = photodata.cat;
	}else if(Math.floor(index/3)==1){
		arrData = photodata.car;
	}else if(Math.floor(index/3)==2){
		arrData = photodata.dog;
	}else{
		arrData = photodata.girl;
	}
	//照片墙类型1渲染
	if(index%3==0){
		photoType1_con.style.display = 'block';
		for(var i=0;i<arrData[1].length;i++){
			photoTypeOneSmallPic(arrData[1][i],arrData[0],i);
			photoTypeOneCarousel(arrData[1][i],i);
		}
		var P = 558/((i-1)*135);
		var h = 558;
		maxN = ((i)*135-558)/40;
		maxn = (558-P*h)/40;
		photoType1ScrollBarBar.style.height = P*h+'px';
		photoType1_conRight_ul.style.width = (i)*938+'px';
		photoType1SmallPic.firstElementChild.style.borderColor = '#ce1131';
	}
	//照片墙类型2渲染
	else if(index%3==1){
		photoType2_con.style.display = 'block';
		photoTypeTwo(arrData[1],arrData[0])
	}
	//照片墙类型2渲染
	else{
		photoType3_con.style.display = 'block';
		for(var i=0;i<arrData[1].length-1;i++){
			photoTypeThree(arrData[1],4-i,i)
		}
	}
}
//照片墙类型1渲染一张略缩图
function photoTypeOneSmallPic(pic,name,i){
	var dl = document.createElement('dl');
	var dt = document.createElement('dt');
	var dd = document.createElement('dd');
	var img = document.createElement('img');
	var span = document.createElement('span');
	var div = document.createElement('div');
	img.src = pic;
	span.innerHTML = name;
	dl.index = i;
	dt.appendChild(img);
	dd.appendChild(div);
	dd.appendChild(span);
	dl.appendChild(dt);
	dl.appendChild(dd);
	dl.onmouseover = function(){
		dd.style.bottom = '0';
	}
	dl.onmouseleave = function(){
		dd.style.bottom = '';
	}
	dl.onclick = function(){
		for(var i=0;i<photoType1SmallPic.children.length;i++){
			photoType1SmallPic.children[i].style.borderColor = '';
		}
		this.style.borderColor = '#ce1131'
		if(this.index>conRightNext.num){
			var n = this.index-conRightNext.num
			var init = {
				obj:photoType1_conRight_ul,
				attrs:{left:-938},
				duration:500,
				callBack:function(){
					for(var i=0;i<n;i++){
						photoType1_conRight_ul.appendChild(photoType1_conRight_ul.firstElementChild);
					}
					photoType1_conRight_ul.style.left = '0px';
					conRightNext.num += n;
				}
			}
			init.attrs.left = -938*n;
		move(init)
		}else if(this.index<conRightNext.num){
			var n = conRightNext.num-this.index;
			photoType1_conRight_ul.style.left = -n*938+'px';
			for(var i=0;i<n;i++){
				photoType1_conRight_ul.insertBefore(photoType1_conRight_ul.lastElementChild,photoType1_conRight_ul.firstElementChild);
			}
			var init = {
				obj:photoType1_conRight_ul,
				attrs:{left:0},
				duration:500,
				callBack:function(){
					conRightNext.num -= n;
				}
			}
			move(init);
		}
	}
	photoType1SmallPic.appendChild(dl);
}
//鼠标移入下拉条出现
photoType1_conLeft.onmouseover = function(){
	photoType1ScrollBarBar.style.opacity = '1';
}
photoType1_conLeft.onmouseleave = function(){
	photoType1ScrollBarBar.style.opacity = '';
}
//滚轮事件
function addMouseWheel(init){
	init.ele.onmousewheel = fn
	init.ele.addEventListener('DOMMouseScroll',fn)
	function fn(ev){
		var onOff = null;
		if(ev.wheelDelta){
			if(ev.wheelDelta>0){
				onOff = true;
			}else{
				onOff = false;
			}
		}else{
			if(ev.detail<0){
				onOff = true;
			}else{
				onOff = false;
			}
		}
		if(onOff){
			typeof init.fnUp == 'function' && init.fnUp();
		}else{
			typeof init.fnDown == 'function' && init.fnDown();
		}
		
	}
}
addMouseWheel({
	ele:photoType1_conLeft,
	fnUp:function(){
		n1--;
		n2--;
		if(n1<0){
			n1=0;
		}
		if(n2<0){
			n2=0;
		}
		photoType1SmallPic.style.top = -n1*40+'px';
		photoType1ScrollBarBar.style.top = n2*40+'px';
	},
	fnDown:function(){
		n1++;
		n2++;
		if(n1>maxN){
			n1=maxN;
		}
		if(n2>maxn){
			n2=maxn;
		}
		photoType1SmallPic.style.top = -n1*40+'px';
		photoType1ScrollBarBar.style.top = n2*40+'px';
	}
})
//照片墙类型1渲染右侧
function photoTypeOneCarousel(pic,i){
	var li = document.createElement('li');
	var img = document.createElement('img');
	img.src = pic;
	li.appendChild(img);
	photoType1_conRight_ul.appendChild(li);
}
//点击下一张
conRightNext.onclick = function(){
	if(conRightNext.check){
		conRightNext.check = !conRightNext.check;
		this.num++;
		if(this.num==6){
			this.num = 0;
		}
		if(this.num==0){
			photoType1SmallPic.style.top = -this.num*135+'px';
			photoType1ScrollBarBar.style.top = '0px';
		}else if(this.num==1){
			photoType1SmallPic.style.top = -this.num*135+'px';
			photoType1ScrollBarBar.style.top = '52px';
		}else if(this.num==5){
			photoType1SmallPic.style.top = '-252px';
			photoType1ScrollBarBar.style.top = '97px';
		}
		//给略缩图加红边框
		for(var i=0;i<photoType1SmallPic.children.length;i++){
			photoType1SmallPic.children[i].style.borderColor = '';
		}
		photoType1SmallPic.children[this.num].style.borderColor = '#ce1131';
		//轮播
		var init = {
			obj:photoType1_conRight_ul,
			attrs:{left:-938},
			duration:500,
			callBack:function(){
				photoType1_conRight_ul.appendChild(photoType1_conRight_ul.firstElementChild);
				photoType1_conRight_ul.style.left = '0px';
				conRightNext.check = !conRightNext.check;
			}
		}
		move(init)
	}
}
//点击上一张
conRightPrev.onclick = function(){
	if(conRightNext.check){
		conRightNext.check = !conRightNext.check;
		conRightNext.num--; 
		if(conRightNext.num==-1){
			conRightNext.num = 5;
		}
		if(conRightNext.num==0){
			photoType1SmallPic.style.top = -conRightNext.num*135+'px';
			photoType1ScrollBarBar.style.top = '0px';
		}else if(conRightNext.num==1){
			photoType1SmallPic.style.top = -conRightNext.num*135+'px';
			photoType1ScrollBarBar.style.top = '52px';
		}else if(conRightNext.num==5){
			photoType1SmallPic.style.top = '-252px';
			photoType1ScrollBarBar.style.top = '97px';
		}
		//给略缩图加红边框
		for(var i=0;i<photoType1SmallPic.children.length;i++){
			photoType1SmallPic.children[i].style.borderColor = '';
		}
		photoType1SmallPic.children[conRightNext.num].style.borderColor = '#ce1131';
		//轮播
		photoType1_conRight_ul.insertBefore(photoType1_conRight_ul.lastElementChild,photoType1_conRight_ul.firstElementChild);
		photoType1_conRight_ul.style.left = '-938px';
		var init = {
			obj:photoType1_conRight_ul,
			attrs:{left:0},
			duration:500,
			callBack:function(){
				conRightNext.check = !conRightNext.check;
			}
		}
		move(init);
	}
}
//照片墙类型2渲染
function photoTypeTwo(pic,name){
	for(var i=0;i<pic.length*3;i++){
		var n = Math.floor(Math.random()*pic.length);
		photoTypeTwoApic(pic[n],name);
	}
	var enlargeCheck = false
	var pic = getEle('.photoType2_con1');
	setTimeout(function(){
		for(var i=0;i<pic.length;i++){
			pic[i].x = pic[i].offsetLeft;
			pic[i].y = pic[i].offsetTop;
			pic[i].style.left = pic[i].offsetLeft+'px';
			pic[i].style.top = pic[i].offsetTop+'px';
			
			console.log(pic[10].x,pic[10].y)
			pic[i].w = pic[i].offsetHeight;
			setTimeout(function(i){
				pic[i].style.position = 'absolute';
			},0,i)
			enlarge(pic[i]);
		}
	},510)
	
	function enlarge(obj){
		obj.onclick = function(){
			if(!enlargeCheck){
				enlargeCheck = true;
				this.style.height = document.body.clientHeight*0.9+'px';
				this.style.position = '';
				this.style.left = '';
				this.style.top = '';
				this.style.boxShadow = '150px 0px 200px #E5E5E5,-150px 0px 200px #E5E5E5'
				this.style.margin = '0 auto';
				this.style.transform = 'rotateX(360deg)';
				this.style.zIndex = '100';
			}else{
				enlargeCheck = false;
				this.style.height = this.w+'px';
				this.style.left = this.x+'px';
				this.style.top = this.y+'px';
				this.style.boxShadow = '';
				this.style.margin = '';
				this.style.transform = '';
				this.style.zIndex = '';
				setTimeout(function(_this){
					_this.style.position = 'absolute';
				},0,this)
			}
		}
	}
}
//照片墙类型2渲染一张
function photoTypeTwoApic(_pic,_name){
	var div1 = document.createElement('div');
	var div2 = document.createElement('div');
	var img = document.createElement('img');
	var span = document.createElement('span');
	var div3 = document.createElement('div');
	img.src = _pic;
	div1.className = 'photoType2_con1';
	div2.className = 'photoType2_con2';
	span.innerHTML = _name;
	div1.appendChild(img);
	div2.appendChild(div3);
	div2.appendChild(span);
	div1.appendChild(img);
	div1.appendChild(div2);
	div1.onmouseover = function(){
		div2.style.bottom = '0';
	}
	div1.onmouseleave = function(){
		div2.style.bottom = '';
	}
	photoType2_conBox.appendChild(div1);
}
//照片墙类型3渲染
function photoTypeThree(pic,n,i){
	photoType3_con_img[n].src = pic[i];
	photoType3_con_img[n].pic = i;
	if(i<5){
		photoType3_con_img[n].index = i;
		//封装类型3大图点击事件
		photoType3_con_lis[n].onclick = function(){
			photoType3Num = this.firstElementChild.index;
			var num = this.firstElementChild.pic;
			var num1 = this.firstElementChild.pic;
			var num2 = 5
			var num3 = this.firstElementChild.index;
			photoType3_con_ul.style.left = -this.firstElementChild.index*photoTypeThree_l+'px';
			//修改类型3原有盒子图片
			for(var k=0;k<pic.length-1;k++){
				photoType3_con_img[4-k].src = pic[num];
				photoType3_con_img[4-k].pic = num;
				num++;
				if(num==arrData[1].length){
					num = 0;
				}
			}
			//生成新盒子
			for(var j=0;j<this.firstElementChild.index;j++){
				var li = document.createElement('li');
				var img = document.createElement('img');
				num1--;
				if(num1<0){
					num1=pic.length-1;
				}
				li.className = 'fly';
				img.src = pic[num1];
				li.appendChild(img);
				li.style.left = num2*photoTypeThree_l+'px';
				num2++;
				photoType3_con_ul.appendChild(li);
				num3--;
				var maxL = document.body.clientWidth*1.15-num3*photoTypeThree_l;
				var init2 = {
					obj:li,
					attrs:{left:maxL},
					duration:1000
				}
				move(init2);
			}
			var init1 = {
				obj:photoType3_con_ul,
				attrs:{left:0},
				duration:1000,
				callBack:function(){
					for(var i=0;i<photoType3Num;i++){
						photoType3_con_ul.removeChild(photoType3_con_ul.lastElementChild);
					}	
				}
			}
			move(init1);
		}
	}
}
