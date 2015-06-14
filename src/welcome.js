
var HelloWorldLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        this.init();
    },
    init:function()
    {
        var winSize = cc.winSize;
      
        var sp = new cc.Sprite(res.loading_png);
        sp.anchorX = 0;
        sp.anchorY = 0;
        sp.scaleX = 1.5;
        this.addChild(sp, 0);

        var singalHeight = PHS.menuHeight;
        var singalWidth = PHS.menuWidth;
        var newGameNormal = new cc.Sprite(res.menu_png,cc.rect(0,0,singalWidth,singalHeight));
        var newGameSelect= new cc.Sprite(res.menu_png,cc.rect(0,singalHeight,singalWidth,singalHeight));
        var newGameDisable= new cc.Sprite(res.menu_png,cc.rect(0,singalHeight*2,singalWidth,singalHeight));

        var flare = new cc.Sprite(res.flare_jpg);
        this.addChild(flare, 15, 10);
        flare.visible = false;
        var newGameItem = new cc.MenuItemSprite(newGameNormal,newGameSelect,newGameDisable,function(){
            this.onButtonEffect();
            flareEffect(flare,this,this.onNewGame)
        }.bind(this));

        var menu = new cc.Menu(newGameItem);
        this.addChild(menu,1,2);
        menu.x = winSize.width/2;
        menu.y = winSize.height/2;

        return true;
    },
    onNewGame:function (pSender) {
        //load resources
        cc.LoaderScene.preload(g_maingame, function () {
            cc.audioEngine.stopMusic();
            cc.audioEngine.stopAllEffects();
            var scene = new cc.Scene();
            scene.addChild(new GameLayer());
            //scene.addChild(new GameControlMenu());
            cc.director.runScene(new cc.TransitionFade(1.2, scene));
        }, this);
    },
    onButtonEffect:function(){
        if (PHS.SOUND) {
            var s = cc.audioEngine.playEffect(cc.sys.os == cc.sys.OS_WP8 || cc.sys.os == cc.sys.OS_WINRT ? res.buttonEffet_wav : res.buttonEffet_mp3);
        }
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

