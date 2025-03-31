const SYSTEM_INFO = uni.getSystemInfoSync()
export const getStatusBarHeight = () => SYSTEM_INFO.statusBarHeight || 15;

export const getTitleBarHeight = () =>{
	if(uni.getMenuButtonBoundingClientRect){
		const {top,height} = uni.getMenuButtonBoundingClientRect()
		return (top-getStatusBarHeight())*2 + height;
	}else{
		return 50;
	}
}

export const getNavBarHeight = () => getStatusBarHeight() + getTitleBarHeight()