//测试ccs动画机制

var BattleLayer = cc.Layer.extend({
	_mainNode:null,
    _obstacles:null,
    _target:null,
	ctor:function(){
		this._super();
		this.init();
	},
	init:function(){
        this._obstacles = [];
        this.addBackLabel();
        // ccs 
		this._mainNode = ccs.load(res.bs);
        this.addChild(this._mainNode.node);

        var shaqAction = this._mainNode.action;
        var shaq = this._mainNode.node.getChildByTag(3513);
        shaq.runAction(shaqAction);
        shaqAction.gotoFrameAndPlay(0,10,true);

        var jack = this._mainNode.node.getChildByTag(3605);
        var jackAction = shaqAction.clone();
        jack.runAction(jackAction);
        jackAction.gotoFrameAndPlay(10,50,true);
        
        var tiles = this._mainNode.node.getChildByTag(3512);
        var mapWidth = tiles.getMapSize().width;
        var mapHeight = tiles.getMapSize().height;
        var tileWidth = tiles.getTileSize().width;
        var tileHeight = tiles.getTileSize().height;
        var collidableLayer = tiles.getLayer("layer2");
        var i, j;
        for (i = 0; i < mapWidth; i++){
            for (j = 0; j < mapHeight; j++){
                var tileCoord = new cc.Point(i, j);
                var gid = collidableLayer.getTileGIDAt(tileCoord);
                if(gid) {
                    var tileXPositon = i * tileWidth;
                    var tileYPosition = (mapHeight * tileHeight) - ((j+1) * tileHeight);
                    var react = cc.rect(tileXPositon, tileYPosition, tileWidth, tileHeight);
                    this._obstacles.push(react);
                }
            }
        }
        this._target = tiles;
        

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
        if('mouse' in cc.sys.capabilities)
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
                            event.getCurrentTarget().pokeHoleAtPoint(point);
                        };
                    }
                }
            }, this);

        if(cc.sys.capabilities.hasOwnProperty('touches')){
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
                        event.getCurrentTarget().pokeHoleAtPoint(point);
                    }
                }
            },this);
        }
       

	},
    //此处使用局部坐标,以便操作命中的板块
    pokeHoleAtPoint:function(point)
    {
       if(this.isCollisionInArray(point,this._obstacles))
       {
            //look for tile and change to cc.Sprite  :: dynamic change for TileMap !
            var tiles = this._mainNode.node.getChildByTag(3512);
            var collidableLayer = tiles.getLayer("layer2");
            var mapWidth = tiles.getMapSize().width;
            var mapHeight = tiles.getMapSize().height;
            var tileWidth = tiles.getTileSize().width;
            var tileHeight = tiles.getTileSize().height;
            var turnCoord = new cc.Point(Math.floor(point.x/tileWidth) , Math.floor((mapHeight*tileHeight-point.y)/tileHeight));
            cc.log(turnCoord);
            var ccsp = collidableLayer.getTileAt(turnCoord);
            ccsp.opacity = 0;
       }
    },
	addBackLabel:function(){
		 //go back to mainmenu
        var label = new cc.LabelTTF("Go back", "Arial", 21);
        label.setColor(cc.color(PHS.FONTCOLOR));
        var back = new cc.MenuItemLabel(label, this.onBackCallback);
        var menu = new cc.Menu(back);
        menu.x = cc.winSize.width - 100;
        menu.y = 60;
        this.addChild(menu,PHS.UITAG);
	},
    onBackCallback:function (pSender) {
        var scene = new cc.Scene();
        scene.addChild(new WelcomeLayer());
        cc.director.runScene(new cc.TransitionFade(1.2, scene));
    },
    isCollisionInArray : function(point, array) {
        for (var i = 0; i < array.length; i++) {
            if (cc.rectContainsPoint(array[i],point)) {
                return true;
            }
        }
        return false;
    },
});

var BattleScene = cc.Scene.extend({
	onEnter:function(){
		this._super();
		var layer = new BattleLayer();
		this.addChild(layer);
	}
});
