const StatEntry=(props)=>{
    const {game_name, high_score,times_played, total_wins, stat_id} = props.stat
    const{ handleDelete} = props
    return(
        <tr className='stat-entry'>
            <td>{game_name}</td>
            <td>{times_played}</td>
            <td>{total_wins}</td>
            <td>{times_played-total_wins}</td>
            <td>{high_score}</td>
            <td className='delete-entry' onClick={()=>handleDelete(stat_id)}>X</td>
        </tr>
    )
}
export default StatEntry