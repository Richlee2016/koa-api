import { controller, all, post, get,sayError } from "../decorator/router";
import { onlineApi } from "../api";
@controller("/online_api")
export class Online {
  constructor() {}
  
  @get('/onlines')
  async getList(ctx,next){
    const p = ctx.query;
    const res = await onlineApi.fetchList(p);
    if(res){
      ctx.body = sayError(1,"请求成功",{data:res})
    }else{
      ctx.body = sayError(0,"请求失败",{data:""})
    };
  }

  @get('/onlines/:id')
  async getList(ctx,next){
    const {id} = ctx.params;
    const res = await onlineApi.fetchOnline(id);
    if(res){
      ctx.body = sayError(1,"请求成功",{data:res})
    }else{
      ctx.body = sayError(0,"请求失败",{data:""})
    };
  }
  
}
