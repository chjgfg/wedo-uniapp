export default function request(url, data = {}, method = 'GET') {
	return new Promise((resove, reject) => {
		uni.request({
			url: url,
			data: data,
			dataType: "application/json",
			method: method,
			success: (res) => {
				// resove(res.data != null ? (typeof res.data == 'string' ? res.data : JSON.parse(res.data)):null);
				resove(res.data ? JSON.parse(res.data):null);
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}
