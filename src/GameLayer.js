

var GameLayer = cc.Layer.extend({
	_breakedLayer:null,
	_holeStencilContainer:null,
	_target:null,
	_scoreLabel:null,
    _weaponIndex:1,
    _armature:null,
    _jack:null,
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

        var action = this._jack.action;
        if(!action.isPlaying()){
            action.gotoFrameAndPlay(0,15,0,true);
        }
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

        //audio
		this.onButtonEffect();

        //score data update
		PHS.GameActor.getInstance().score ++;

        this.onPokeEffect(point);
       
	},
    onPokeEffect:function(point){
         //cyborg changes weapon
        ++this._weaponIndex;
        this._weaponIndex = this._weaponIndex % 4;
        this._armature.getBone("armInside").getChildArmature().getAnimation().playWithIndex(this._weaponIndex);
        this._armature.getBone("armOutside").getChildArmature().getAnimation().playWithIndex(this._weaponIndex);

        //particle
        var emitter = new cc.ParticleMeteor();
        emitter.x = point.x;
        emitter.y = point.y;
        emitter.life = 2;
        // emitter.speed = 100;
        emitter.gravity = cc.p(0, -500);
        emitter.emissionRate = 5;
        emitter.texture = cc.textureCache.addImage(res.fire_png);
        emitter.shapeType = cc.ParticleSystem.BALL_SHAPE;
        this.addChild(emitter,PHS.UITAG);
        this.scheduleOnce(function(dt){
        	emitter.removeFromParent();
        },1);

        //jack open fire
        jackNode = this._jack.node;
        var action = this._jack.action;
        if(action){
            // jackNode.runAction(action);
            action.gotoFrameAndPlay(25,55,25,false);//严格执行4参数,否则原生平台会出bug
        }
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
        //UI character
     	this._scoreLabel = new cc.LabelBMFont("Shoot: 0", res.arial_14_fnt);
     	this._scoreLabel.attr({
     		anchorX:0,
     		anchorY:1,
     		x:0,
     		y:cc.winSize.height
     	});
     	this._scoreLabel.textAlign = cc.TEXT_ALIGNMENT_LEFT;
        this.addChild(this._scoreLabel, PHS.UITAG);
        //go back to mainmenu
        var label = new cc.LabelTTF("Go back", "Arial", 21);
        label.setColor(cc.color(PHS.FONTCOLOR));
        var back = new cc.MenuItemLabel(label, this.onBackCallback);
        var menu = new cc.Menu(back);
        menu.x = cc.winSize.width - 100;
        menu.y = 60;
        this.addChild(menu,PHS.UITAG);

         //test bg move
        var bg = new Background();
        bg.createWithTileMap(0);
        this.addChild(bg,-PHS.UITAG); 

        //web doesn't support jsb.
        // var model = new cc.Sprite("res/shoot/orc.c3b");
        // model.setScale(5);
        // this.addChild(model,100); 

        this.addWigetCyborg();

        this.addWeatherEffect();
       
    },
    onBackCallback:function (pSender) {
        var scene = new cc.Scene();
        scene.addChild(new WelcomeLayer());
        cc.director.runScene(new cc.TransitionFade(1.2, scene));
    },
    setMainLogic:function()
    {
        var mainContainer = new cc.Layer();
        this.addChild(mainContainer,0);

    	this._target = new cc.Sprite(res.girl_jpg_1);
        this._target.anchorX = 0.5;
        this._target.anchorY = 0.5;
        this._target.scale = 0.5;
        this._target.x = cc.winSize.width/2; 
        this._target.y = cc.winSize.height/2; 
        mainContainer.addChild(this._target, 0);
 		var targetMask = new cc.Sprite(res.girl_jpg_1);
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
        mainContainer.addChild(outClipping);
    },
    addWigetCyborg:function(){
        ccs.armatureDataManager.addArmatureFileInfo(res.s_cyborg_png, res.s_cyborg_plist, res.s_cyborg_xml);
        this._armature = new ccs.Armature("cyborg");
        // this._armature.getAnimation().playWithIndex(1);
        this._armature.getAnimation().play("run");
        this._armature.x = this._armature.width / 2;
        this._armature.y = this._armature.height/2;
        this._armature.scale = 1.0;
        this._armature.getAnimation().setSpeedScale(0.5);
        this.addChild(this._armature,PHS.UITAG);
        this._weaponIndex = 0;

         //captain jack
        this._jack = ccs.load(res.jack);
        jackNode = this._jack.node;
        jackNode.x = cc.winSize.width/2;
        var action = this._jack.action;
        if(action){
            jackNode.runAction(action);
            action.gotoFrameAndPlay(0,15,0,true);
        }
        this.addChild(jackNode);
    },
    addWeatherEffect:function()
    {
        var emitter = new cc.ParticleRain();
        this.addChild(emitter, PHS.UITAG);
        emitter.life = 4;

        emitter.texture = cc.textureCache.addImage(res.fire_png);
        emitter.shapeType = cc.ParticleSystem.BALL_SHAPE;
        emitter.x = cc.winSize.width/2;
        emitter.y = cc.winSize.height - 100;
    }
});