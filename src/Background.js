/*
	背景层,可自动生成N层背景, 
	设置最内层速度为_speed , 
	每层速度变换比率为_ratio , 
	每层使用的图片为PHS.BackgroundArr中
*/


var Background = cc.Layer.extend({
	_skyBgs:null,
	_speed:2,
	_ratio:2,
	ctor:function(){
		this._super();
		this.init();
	},
	init:function(){
		this._skyBgs = [];
		this.createField(0);
		this.createField(1);
		this.scheduleUpdate();
	},
	update:function(dt)
	{
		for (var i = 0; i < this._skyBgs.length; i++) {
			var layers = this._skyBgs[i];
			for (var j = 0; j < 2; j++) {
			 	var layer = layers[j];
			 	layer.x += dt*this._speed *((i+1)*this._ratio);// time * speed * ratio
				if(layer.x >= cc.winSize.width)
				{
					layer.x = -cc.winSize.width;
				}
			}
		};
		
	},
	createField:function(index)
	{
		var size = cc.winSize;
		this._skyBgs[index] = [];
		//sky layer
		var skyBg = new cc.Layer();
		this.addChild(skyBg,-10-index);

		var skySp1 = new cc.Sprite(PHS.BackgroundArr[index]);
		skySp1.attr({
			anchorX:0,
			anchorY:0,
			scaleX:size.width/skySp1.width
		});
		skyBg.addChild(skySp1);
		this._skyBgs[index].push(skySp1);

		var skySp2 = new cc.Sprite(PHS.BackgroundArr[index]);
		skySp2.attr({
			anchorX:0,
			anchorY:0,
			scaleX:size.width/skySp1.width,
			x:-size.width
		});
		skyBg.addChild(skySp2);
		this._skyBgs[index].push(skySp2);
	}
});