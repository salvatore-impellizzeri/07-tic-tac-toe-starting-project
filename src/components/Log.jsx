export default function Log({ turnsInfo }){
    
    return(
        <ol id="log">
            {turnsInfo.map((turn,index) => 
                <li key={`${turn.square.row}${turn.square.col}`}>
                    {turn.player} selected {turn.square.row + 1},{turn.square.col + 1}
                </li>
        )}
        </ol>
    );
}