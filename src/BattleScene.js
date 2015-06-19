//测试ccs动画机制

var BattleLayer = cc.Layer.extend({
	_mainNode:null,
    _obstacles:null,
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
        var collidableLayer = tiles.getLayer("layer1");
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
        

        // var action = ccs.actionManager.getActionByName( res.shaq, "attack");
       

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
});

var BattleScene = cc.Scene.extend({
	onEnter:function(){
		this._super();
		var layer = new BattleLayer();
		this.addChild(layer);
	}
});
