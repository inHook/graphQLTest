import React from 'react';
import axios from "axios";

import "./style.css";

class COVID19 extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            countries: [],
        }
    }

    componentDidMount = async () => {
        const infectedCountries = await axios.get("https://corona-api.com/countries");
        const requestStatus = infectedCountries?.status;
        const requestData = infectedCountries?.data?.data;

        if (requestStatus && requestData) {
            this.setState({
                countries: requestData,
            })
        }
    };

    render() {
        const {countries} = this.state;

        return countries.length ? (
            <table className="covid-table">
                <thead>
                <tr>
                    <td>Страна</td>
                    <td>Последнее обновление</td>
                    <td>Сегодня смертей / заражённых</td>
                    <td>Всего смертей / заражённых</td>
                    <td>Выздоровили</td>
                    <td>Летальность</td>
                </tr>
                </thead>
                <tbody>
                {
                    countries.map(country => {
                        const dataUpdate = new Date(country.updated_at);
                        const hours = dataUpdate.getHours();
                        const minutes = dataUpdate.getMinutes();
                        const lethal = country?.latest_data?.calculated?.death_rate?.toFixed(2);

                        return (
                            <tr>
                                <td>{country?.name}</td>
                                <td>{`${hours}:${minutes}`}</td>
                                <td>{`${country?.today?.deaths} / ${country?.today?.confirmed}`}</td>
                                <td>{`${country?.latest_data?.deaths} / ${country?.latest_data?.confirmed}`}</td>
                                <td>{country?.latest_data?.recovered}</td>
                                <td>{lethal ? `${lethal}%` : null}</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        ) : null;
    }
}

export {COVID19}