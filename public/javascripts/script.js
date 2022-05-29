anime({
    targets: '.arrow',
    translateY: 10,
    direction: 'alternate',
    loop: true,
    easing: 'easeInOutSine'
});

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

