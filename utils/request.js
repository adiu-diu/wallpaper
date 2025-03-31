// 重新封装uni.request
export const request = (config={}) =>{
	let BASE_URL = 'https://tea.qingnian8.com/api/bizhi'
	// 将传递的参数进行解构赋值
	let {url,data={},method="GET",header={}} = config
	url = BASE_URL + url
	header['access-key'] = 'adiu666'
	return new Promise((resolve,reject)=>{
		uni.request({
			url:url,
			data,
			method,
			header,
			success:res=>{
				if(res.data.errCode === 0){
					resolve(res.data)
				}else if(res.data.errCode === 400){
					uni.showModal({
						title:"错误提示",
						content:res.data.errMsg,
						showCancel:false
					})
					reject(res.data)
				}else{
					uni.showToast({
						title:res.data.errMsg,
						icon:"none"
					})
					res.reject(res.data)
				}
			},
			fail:err=>{
				reject(err)
			}
		})
	})
}