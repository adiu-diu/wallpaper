// 计算最近的更新时间
export const formatTimeDiff = (Timestamp) =>{
	const diff = Date.now() - Timestamp;
	if(diff < 60000){
		return '1分钟内';
	}else if(diff < 3600000){
		return Math.floor(diff/60000) + '分钟';
	}else if(diff < 86400000){
		return Math.floor(diff/3600000) + '小时';
	}else if(diff < 2592000000){
		return Math.floor(diff/86400000) + '天';
	}else if(diff < 7776000000){
		return Math.floor(diff/2592000000) + '月';
	}else{
		return null;
	}
}


export const goHome = () =>{
	uni.showModal({
		title:'提示',
		content:'页面有误，将跳转回首页',
		showCancel:false,
		success:res=>{
			if(res.confirm){
				uni.reLaunch({
					url:'/pages/index/index'
				})
			}
		}
	})
}