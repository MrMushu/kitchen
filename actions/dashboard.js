import axios from 'axios'

export function saveBumpDelay({ merchantId, code }) {
    return function () {
        var month = new Date().getMonth() + 1
        var day = new Date().getDate()
        var year = new Date().getFullYear()
        var date_str = year + '/' + month + '/' + day
        var date = new Date(date_str).getTime() / 1000
        var tickets = this.props.tickets.completed.filter(ticket => ticket.time > date)
        var total = 0
        for (var i = 0; i < tickets.length; i++) {
            total = total + tickets[i].bumpDelay;
        }
        rate = total / tickets.length
        console.log(rate)
        axios
            .post(`https://rocky-thicket-13861.herokuapp.com/api/saveBumpDelay/`, {

                merchant_id: merchantId,
                code: code,
                date: date_str,
                rate: rate

            })
            .catch(function (err) {
                console.log("error: ", err);
            });
    }
}

export const GET_DASHBOARD = (merchantId, code, days = 1) => {
    return (dispatch) => {
        var month = new Date().getMonth() + 1
        var day = new Date().getDate()
        var year = new Date().getFullYear()
        var date_str = year + '/' + month + '/' + day
        var date = new Date(date_str).getTime() / 1000
        var range = date - (60 * 60 * 24 * days)
        return axios
            .post(`https://rocky-thicket-13861.herokuapp.com/api/getDashboard/`, {

                merchant_id: merchantId,
                code: code,
                start_time: range,
                end_time: date

            })
            .then(response => {
                var data = (JSON.parse(response.data));
                dispatch({
                    type: GET_DASHBOARD,
                    data: data
                })
                console.log(data)

            })
            .catch(function (err) {
                console.log("error: ", err);
            });
    }
}




