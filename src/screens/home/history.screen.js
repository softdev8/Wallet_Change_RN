import React from 'react';
import { connect } from 'react-redux';
import {
    View, TouchableOpacity,
    StyleSheet,
    SectionList,
    ActivityIndicator
} from 'react-native';
import { Divider, Text, Icon, FormValidationMessage } from 'react-native-elements';
import moment from 'moment';
import { SwitchButton, DatePicker } from '../../components';
import appStyles, { mainBgColor, secondaryBgColor, mainTextColor } from '../../shared/app-styles';
import { HistoryAction } from '../../actions/index';
class HistoryScreenContainer extends React.Component {
    static navigationOptions = {
        headerStyle: { backgroundColor: mainBgColor },
        title: 'Transaction History'
    }
    constructor(props) {
        super(props);
        this.state = { queryType: 'all', dateRangeType: 'Past30Days' };
    }

    componentDidMount() {
        const { queryType, dateRangeType } = this.state;
        this.queryTransactions(queryType, dateRangeType);
    }
    queryTransactions(transType, dateRangeType) {

        const { dispatch } = this.props;

        let dateTo = moment().utc().format('YYYYMMDD');
        let dateFrom = moment().add(-30, 'd').utc().format('YYYYMMDD');

        if (dateRangeType === 'Past1Year') {
            dateFrom = moment().add(-1, 'y').utc().format('YYYYMMDD');
        }
        else if (dateRangeType === 'Custom') {
            dateFrom = moment(this.dateFrom.getDate()).utc().format('YYYYMMDD');
            dateTo = moment(this.dateTo.getDate()).utc().format('YYYYMMDD');
        }

        dispatch(HistoryAction.query(transType, dateFrom, dateTo))
    }
    onSwitchTransQueryType(val) {
        const { queryType, dateRangeType } = this.state;
        if (queryType !== val) {
            this.setState({ queryType: val });
        }
        this.queryTransactions(val, dateRangeType);
    }
    onSwitchTransQueryDateRangeType(val) {
        const { queryType, dateRangeType } = this.state;
        if (val !== 'Custom') {
            this.dateFrom.reset();
            this.dateTo.reset();
        }
        if (dateRangeType !== val) {
            this.setState({ dateRangeType: val });
            this.queryTransactions(queryType, val);
        }

    }
    onPickedDate(date, type) {
        const { queryType, dateRangeType } = this.state;
        if (type === 'from') {
            this.setState({ dateRangeType: 'Custom' });
            if (dateRangeType === 'Custom') {
                this.queryTransactions(queryType, dateRangeType);
            }
        }
        else if (type == 'to') {
            this.queryTransactions(queryType, dateRangeType);
        }
    }
    sortHistoryData(data) {
        let sortedData = data.sort((a, b) => a - b);
        sortedData = sortedData.reduce((r, a) => {
            const time = a.time;
            const title = moment(time).format('YYYY-MM-DD');
            let section = r.find(item => item.title === title);
            if (section == null) {
                section = { title: title, data: [] };
                r.push(section);
            }
            section.data.push(a);

            return r;
        }, []);
        return sortedData;
    }
    render() {
        const { status, error, records } = this.props.history;
        const sortedData = this.sortHistoryData(records);
        const { queryType, dateRangeType } = this.state;
        return (
            <View style={{ flex: 1, borderWidth: 0, borderBottomColor: '#f00', backgroundColor: '#7e57c2' }}>
                <View style={[appStyles.fullWidth, { backgroundColor: '#fff' }]} ></View>
                <View style={[appStyles.container,{paddingLeft:10,paddingRight:10}]}>
                    <View style={[styles.row]}>
                        <SwitchButton title="ALL" value="all" on={queryType === 'all'}
                            onSwitch={this.onSwitchTransQueryType.bind(this)} />
                        <SwitchButton title="Withdrawal" value="withdrawal" on={queryType === 'withdrawal'}
                            onSwitch={this.onSwitchTransQueryType.bind(this)}
                        />
                        <SwitchButton title="Deposit" value="deposit" on={queryType === 'deposit'}
                            onSwitch={this.onSwitchTransQueryType.bind(this)}
                        />
                    </View>
                    <View style={[styles.row,{alignItems:'center'}]}>
                        <SwitchButton title="Past 30 Days" value="Past30Days" on={dateRangeType == 'Past30Days'}
                            onSwitch={this.onSwitchTransQueryDateRangeType.bind(this)}
                        />
                        <SwitchButton title="Past Year" value="Past1Year" on={dateRangeType === 'Past1Year'}
                            onSwitch={this.onSwitchTransQueryDateRangeType.bind(this)}
                        />
                        <View style={[styles.row, { marginBottom: 0,marginLeft:15,alignItems: 'center' }]}>
                            <DatePicker ref={(from) => this.dateFrom = from}
                                placeholder='FROM'
                                maxDate={new Date()}
                                defaultDate={moment().add(-30, 'd').toDate()}
                                onPickedDate={(date) => { this.onPickedDate(date, 'from') }}
                            />
                            <DatePicker ref={(to) => this.dateTo = to}
                                placeholder='TO'
                                disabled={dateRangeType !== 'Custom'}
                                maxDate={new Date()}
                                defaultDate={new Date()}
                                onPickedDate={(date) => { this.onPickedDate(date, 'to') }}
                            />

                        </View>
                    </View>
                </View>
                <Divider />
                {error &&
                    <View style={[appStyles.container, { alignItems: 'center' }]}>
                        {<FormValidationMessage>{error.text}</FormValidationMessage>}
                    </View>
                }
                {status === 'fetching' &&
                    <View style={[appStyles.container]}>
                        <ActivityIndicator size="large" color={secondaryBgColor} />
                    </View>
                }
                {status === 'fetched' &&
                    <SectionList style={[appStyles.container]}
                        keyExtractor={(item) => item.transaction_id}
                        renderItem={({ item }) => <ListItem data={item} />}
                        renderSectionHeader={({ section }) => <Header key={section.title} title={section.title} />}
                        sections={sortedData}
                    />
                }
            </View>
        );
    }
}

const ListItem = (props) => {
    const { transaction_id, amount, time, type } = props.data;
    const amountTextClr = type === 'deposit' ? mainBgColor : null;
    return (
        <View style={styles.listItem}>
            <Icon
                containerStyle={styles.listItemIcon}
                size={30} color={secondaryBgColor}
                type='material-community' name='bank' />
            <View>
                <Text>{type} - {moment(time).format('HH:mm:ss')}</Text>
                <Text style={{ fontSize: 12, color: '#cccccc' }}>transaction:{transaction_id}</Text>
            </View>
            <View style={{ paddingLeft: 5, flex: 1, justifyContent: 'center', alignSelf: 'stretch' }}>
                <Text style={{ textAlign: 'right', color: amountTextClr }}>$ +{amount}</Text>
            </View>
        </View>
    );
};
const Header = (props) => {
    return (
        <View style={styles.sectionHeader}>
            <Text>{props.title}</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 10,

    },
    sectionHeader:
    {
        marginTop: 10,
    },
    listItem:
        {
            flexDirection: 'row',
            height: 70,
            alignItems: 'center'
        },
    listItemIcon:
        {
            marginRight: 5,
            marginBottom: 5,
            marginTop: 5
        }
});

export default connect((state) => ({ history: state.history }))(HistoryScreenContainer);
