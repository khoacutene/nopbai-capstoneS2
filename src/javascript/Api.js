class Api{
    getListPhone() {
        return axios({
          url: "https://670fd53ea85f4164ef2c1d34.mockapi.io/capstone2",
          method: "GET",
        });
      }
      deletePhoneById(id) {
        return axios({
          url: `https://670fd53ea85f4164ef2c1d34.mockapi.io/capstone2/${id}`,
          method: "DELETE",
        });
      }
    
      addPhone(capstone2) {
        return axios({
          url: `https://670fd53ea85f4164ef2c1d34.mockapi.io/capstone2`,
          method: "POST",
          data: capstone2,
        });
      }
    
      getPhoneById(id) {
        return axios({
          url: `https://670fd53ea85f4164ef2c1d34.mockapi.io/capstone2/${id}`,
          method: "GET",
        });
      }
    
      updatePhoneById(capstone2) {
        return axios({
          url: `https://670fd53ea85f4164ef2c1d34.mockapi.io/capstone2/${capstone2.id}`,
          method: "PUT",
          data: capstone2,
        });z
      }
      
}
export default Api;