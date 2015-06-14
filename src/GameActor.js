PHS.GameActor = cc.Class.extend(
	{
		score:null,
		init:function(){
			return true;
		}
	}
);

PHS.GameActor.getInstance = function()
{
	//cc.assert(this._sharedActor, "Havn't call setSharedGame");  //截止目前只是存储数据,没有这个必要了.全局唯一就好了.
	if(!this._sharedActor)
	{
		this._sharedActor = new PHS.GameActor();
		if(this._sharedActor.init())
		{
			return this._sharedActor;
		}
	}
	else
	{
		return this._sharedActor;
	}
	return null;
};
PHS.GameActor._sharedActor = null;