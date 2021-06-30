import { Component } from 'react';
import { AppointmentPicker } from 'react-appointment-picker';
import { dateArraySort } from '../Utils';

// public react-appointment-picker:
// taken from 'https://www.npmjs.com/package/react-appointment-picker'
export default class AppointmentBox extends Component {
    state = {
        continuousLoading: false
    };

    updateAndNotify = () => {
        if (this.updateTimer) return;
        this.setState({ continuousLoading: true });
        this.updateTimer = setTimeout(() => {
            this.setState({ continuousLoading: false });
            this.updateTimer = null;
        }, 100);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.firstDate !== this.props.firstDate) {
            this.updateAndNotify();
        }
    }

    addAppointmentToArray = (day, number, id) => {
        const newArr = [...this.props.dates];
        const newObject = {
            day: day,
            number: number,
            id: id
        }
        let isExist = false;

        newArr.forEach((item) => {
            if (item.day === day && item.number === number) {
                isExist = true;
            }
        })

        if (!isExist) {
            newArr.push(newObject);
            this.props.setDates(dateArraySort(newArr));
        }
    }

    removeAppointmentFromArray = (day, number) => {
        const oldArr = [...this.props.dates];
        const newArr = [];
        oldArr.forEach((item, index) => {
            if (item.day !== day || item.number !== number)
                newArr.push(oldArr[index]);
        });

        this.props.setDates(newArr);
    }

    addAppointmentCallbackContinuousCase = ({
        addedAppointment: { day, number, time, id },
        addCb,
        removedAppointment: params,
        removeCb
    }) => {
        this.setState(
            {
                continuousLoading: true
            },
            async () => {
                if (removeCb) {
                    await new Promise((resolve) => setTimeout(resolve, 250));
                    console.log(
                        `Removed appointment ${params.number}, day ${params.day}, time ${params.time}, id ${params.id}`
                    );
                    removeCb(params.day, params.number);
                }
                await new Promise((resolve) => setTimeout(resolve, 100));
                console.log(
                    `Added appointment ${number}, day ${day}, time ${time}, id ${id}`
                ); // day + '' + time 
                addCb(day, number, time, id);

                this.addAppointmentToArray(day, number, id);
                this.setState({ continuousLoading: false });
            }
        );
    };

    removeAppointmentCallbackContinuousCase = (
        { day, number, time, id },
        removeCb
    ) => {
        this.setState(
            {
                continuousLoading: true
            },
            async () => {
                await new Promise((resolve) => setTimeout(resolve, 100));
                console.log(
                    `Removed appointment ${number}, day ${day}, time ${time}, id ${id}`
                );
                removeCb(day, number);

                this.removeAppointmentFromArray(day, number);
                this.setState({ continuousLoading: false });
            }
        );
    };

    render() {
        const days = [
            [
                { id: 1, number: 1 },
                { id: 2, number: 2 },
                { id: 3, number: 3 },
                { id: 4, number: 4 }
            ],
            [
                { id: 5, number: 1 },
                { id: 6, number: 2 },
                { id: 7, number: 3 },
                { id: 8, number: 4 }
            ],
            [
                { id: 9, number: 1 },
                { id: 10, number: 2 },
                { id: 11, number: 3 },
                { id: 12, number: 4 }
            ],
            [
                { id: 13, number: 1 },
                { id: 14, number: 2 },
                { id: 15, number: 3 },
                { id: 16, number: 4 }
            ],
            [
                { id: 17, number: 1 },
                { id: 18, number: 2 },
                { id: 19, number: 3 },
                { id: 20, number: 4 }
            ],
            [
                { id: 21, number: 1 },
                { id: 22, number: 2 },
                { id: 23, number: 3 },
                { id: 24, number: 4 }
            ]
        ];

        const { continuousLoading } = this.state;

        return (
            <div>
                <AppointmentPicker
                    addAppointmentCallback={
                        this.addAppointmentCallbackContinuousCase
                    }
                    removeAppointmentCallback={
                        this.removeAppointmentCallbackContinuousCase
                    }
                    initialDay={
                        new Date(this.props.firstDate)
                    }
                    days={days}
                    maxReservableAppointments={20}
                    visible
                    loading={continuousLoading}
                    continuous
                    unitTime={7200_10_0}
                    local
                />
            </div>
        );
    }
}