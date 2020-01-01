 const deletItem = (index, item) => {
    debugger;
    const itemid = item._id;
    
    var option = {
      method: "POST",
      body: JSON.stringify({ itemid }),
      headers: {
        "Content-Type": "application/json"
      }
    };
    fetch("http://localhost:8080/api/deleteCartitem", option)
    .then(res => {
      return res.json();
    })
    .then(response => {
      console.log(response);
      if (response.success === true) {
        fetch("http://localhost:8080/api/cartshow")
        .then(response => response.json())
        .then(res => {
          this.setState({
            cartData: res.data
          });
        })
      }
    });
  };
    
   export default deletItem;