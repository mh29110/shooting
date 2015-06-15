var GameLayer = cc.Layer.extend({
	_breakedLayer:null,
	_holeStencilContainer:null,
	_target:null,
	_scoreLabel:null,
	ctor:function(){
		this._super();
		this.init();
	},
	init:function()
	{
		this.addEvent();
		this.initView();
		this.initData();

		this.scheduleUpdate();
		return true;
	},
	update:function(dt)
	{
		this.onUpdateUI();
	},
	onUpdateUI:function(dt)
	{
		this._scoreLabel.setString("Shoot: " + PHS.GameActor.getInstance().score);
	},
	pokeHoleAtPoint:function(point)
	{
		var hole = new cc.Sprite(res.hole_effect_png);
		hole.x = point.x;
		hole.y = point.y;
		hole.rotation = Math.random()*360;
		this._breakedLayer.addChild(hole,1);

		var holeStencil = new cc.Sprite(res.hole_stencil_png);
		holeStencil.x = point.x;
		holeStencil.y = point.y;
		this._holeStencilContainer.addChild(holeStencil);
		this._breakedLayer.runAction(cc.sequence(cc.scaleBy(0.01, 0.99), cc.scaleTo(0.01, 1)));

		hole.scale = holeStencil.scale = 1.5;

		this.onButtonEffect();

		PHS.GameActor.getInstance().score ++;
	},
	onButtonEffect:function(){
        //if (PHS.SOUND) {  annoying 
        if (false) {
            var s = cc.audioEngine.playEffect(cc.sys.os == cc.sys.OS_WP8 || cc.sys.os == cc.sys.OS_WINRT ? res.buttonEffet_wav : res.buttonEffet_mp3);
        }
    },

//---------------------------------------init------------------------------------------------//
	initData:function()
	{
		PHS.GameActor.getInstance().score = 0;
	},
    addEvent:function()
    {
    	if(cc.sys.capabilities.hasOwnProperty('keyboard'))
		{
			cc.eventManager.addListener({
				event:cc.EventListener.KEYBOARD,
				onKeyPressed:function(key,event){
					PHS.KEYS[key] = true;
					cc.log("log123123");
				},
				onKeyReleased:function(key,event){
					PHS.KEYS[key] = false;
				}
			},this);
		}
        if ('mouse' in cc.sys.capabilities)
            cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,
                onMouseDown: function(event){
                    if(event.getButton() == cc.EventMouse.BUTTON_LEFT)
                    {
                    	var container = event.getCurrentTarget(); // === GameLayer
                    	var touch = event.getLocation();
				        var point = container._target.convertToNodeSpace(touch);
				        var rect = cc.rect(0, 0, container._target.width, container._target.height);
                    	if (cc.rectContainsPoint(rect,point)) {
	                        event.getCurrentTarget().pokeHoleAtPoint(touch);
                    	};
                    }
                }
            }, this);

        if (cc.sys.capabilities.hasOwnProperty('touches')){
            cc.eventManager.addListener({
                prevTouchId: -1,
                event: cc.EventListener.TOUCH_ALL_AT_ONCE,
                onTouchesBegan:function (touches, event) {
	                var container = event.getCurrentTarget(); // === GameLayer
	    			var touch = touches[0];
	    			var touchPoint = touch.getLocation();
			        var point = container._target.convertToNodeSpace(touchPoint);
			        var rect = cc.rect(0, 0, container._target.width, container._target.height);
	               if (cc.rectContainsPoint(rect,point))
	      			{
	                	event.getCurrentTarget().pokeHoleAtPoint(touchPoint);
	      			}
            	}
       		},this);
        }
    },
    initView:function()
    {
    	this.setMainLogic();

     	this._scoreLabel = new cc.LabelBMFont("Shoot: 0", res.arial_14_fnt);
     	this._scoreLabel.attr({
     		anchorX:0,
     		anchorY:1,
     		x:0,
     		y:cc.winSize.height
     	});
     	this._scoreLabel.textAlign = cc.TEXT_ALIGNMENT_LEFT;
        this.addChild(this._scoreLabel, 1000);

         //test bg move
        var bg = new Background(0);
        this.addChild(bg,-100); 
    },

    setMainLogic:function()
    {

    	this._target = new cc.Sprite(res.girl_jpg);
        this._target.anchorX = 0.5;
        this._target.anchorY = 0.5;
        this._target.scale = 0.5;
        this._target.x = cc.winSize.width/2; 
        this._target.y = cc.winSize.height/2; 
        this.addChild(this._target, 0);
 		var targetMask = new cc.Sprite(res.girl_jpg);
        targetMask.anchorX = 0.5;
        targetMask.anchorY = 0.5;
        targetMask.scale = 0.5;
        targetMask.x = cc.winSize.width/2; 
        targetMask.y = cc.winSize.height/2; 


        //hole' stencil container
        this._holeStencilContainer = new cc.Node();
        this._holeStencilContainer.retain();
        //be breaking when bullet hit;
        this._breakedLayer = new cc.Sprite();
        var mask = new cc.Sprite(res.loading_png);
        mask.anchorX = 0.5;
        mask.anchorY = 0.5;
        mask.scale = 1.5;
        mask.x = cc.winSize.width/2;
        mask.y = cc.winSize.height/2;
        this._breakedLayer.addChild(mask);

        //inner to show the gun shoot effect
        var innerClipping = new cc.ClippingNode();
        innerClipping.retain();
        innerClipping.inverted = true;
        innerClipping.alphaThreshold = 0.05;  //IMPORTANT
        innerClipping.addChild(this._breakedLayer);
        innerClipping.stencil = this._holeStencilContainer;
        //outter to show the target rectangle
        var outClipping = new cc.ClippingNode();
        outClipping.stencil = targetMask;
        outClipping.addChild(innerClipping);
        this.addChild(outClipping);
    }
});