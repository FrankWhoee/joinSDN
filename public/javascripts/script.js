anime({
    targets: '.arrow',
    translateY: 10,
    direction: 'alternate',
    loop: true,
    easing: 'easeInOutSine'
});


const example_list = [{name: "SDN KazzaZoo#001", date: "June 9th, 2019"}, {
    name: "SDN SilverZala#002",
    date: "June 9th, 2019"
}, {name: "SDN TheFlash1205#003", date: "June 9th, 2019"}, {
    name: "SDN TreeRacks#004",
    date: "June 9th, 2019"
}, {name: "SDN FrankWhoee#005", date: "March 6th, 2020"},
    {name: "SDN Oblivious#006", date: "April 16th, 2019"},
    {name: "SDN SnazzyTurtles#007", date: "December 29th, 2021"}]


class PlayerList extends React.Component {
    constructor(props) {
        super(props);
        // this.state = { liked: false };
    }

    render() {
        const rows = [];
        this.props.players.forEach((player) => {
            const jtime = new Date(player.time_joined);
            rows.push(<PlayerListRow name={player.name + "#" + player.tag} date={dateFormat(jtime, "mmm dd, yyyy")}/>);
            rows.push(<hr class="shorterhr"/>);
        })

        return (
            <div className="container  text-center playerbox">
                {rows}
            </div>
        )
    }
}

class PlayerListRow extends React.Component {
    render() {
        const name = this.props.name;
        const date = this.props.date;

        return (
            <div className="row justify-content-center py-3">
                <div className="col-sm-4 gray"> {name} </div>
                <div className="col-sm-4 gray">{date}</div>
            </div>
        );
    }
}

function refreshAndRender(){
    fetch("/players")
        .then(response => response.json())
        .then(data => {
            ReactDOM.render(<PlayerList players={data}/>, document.getElementById("playerlist"))
        });

}

refreshAndRender()

