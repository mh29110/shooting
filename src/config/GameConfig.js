
var PHS = PHS || {};

//game state
PHS.GAME_STATE = {
    HOME:0,
    PLAY:1,
    OVER:2
};

//keys
PHS.KEYS = [];

//level
PHS.LEVEL = {
    STAGE1:1,
    STAGE2:2,
    STAGE3:3
};

//life
PHS.LIFE = 4;

//score
PHS.SCORE = 0;

//sound
PHS.SOUND = true;

//enemy move type
PHS.ENEMY_MOVE_TYPE = {
    ATTACK:0,
    VERTICAL:1,
    HORIZONTAL:2,
    OVERLAP:3
};

//delta x
PHS.DELTA_X = -100;

//offset x
PHS.OFFSET_X = -24;

//rot
PHS.ROT = -5.625;

//bullet type
PHS.BULLET_TYPE = {
    PLAYER:1,
    ENEMY:2
};

//weapon type
PHS.WEAPON_TYPE = {
    ONE:1
};

//unit tag
PHS.UNIT_TAG = {
    ENMEY_BULLET:900,
    PLAYER_BULLET:901,
    ENEMY:1000,
    PLAYER:1000
};

//attack mode
PHS.ENEMY_ATTACK_MODE = {
    NORMAL:1,
    TSUIHIKIDAN:2
};

//life up sorce
PHS.LIFEUP_SORCE = [50000, 100000, 150000, 200000, 250000, 300000];

//container
PHS.CONTAINER = {
    ENEMIES:[],
    ENEMY_BULLETS:[],
    PLAYER_BULLETS:[],
    EXPLOSIONS:[],
    SPARKS:[],
    HITS:[],
    BACKSKYS:[],
    BACKTILEMAPS:[]
};

//bullet speed
PHS.BULLET_SPEED = {
    ENEMY:-200,
    SHIP:900
};
// the counter of active enemies
PHS.ACTIVE_ENEMIES = 0;

PHS.LOGOY = 350;
PHS.FLAREY = 445;
PHS.SCALE = 1.5;
PHS.WIDTH = 800;
PHS.HEIGHT = 450;
PHS.FONTCOLOR = "#1f2d96";
PHS.menuHeight = 36;
PHS.menuWidth = 123;