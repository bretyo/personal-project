import { useState } from "react"

const Dash =(props)=>{
    const {image, player} = props

    //In life, you''ll meet two kinds of people. The ones who ____`, ` and the ones who ____`, `. In the end, you''ll thank them both.
    //Convince yourself that you have the power to ____.
    const resp = [`There’s no need to rush. What’s meant for you always will find you in your sleep. asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf ads fasd fasdf asd fasdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf `].join()//, ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam debitis`].join('')//`id deserunt officiis, repellat accusamus! Corporis, provident debitis est excepturi iusto maxime fugit eligendi vel culpa consequatur sunt, minus quis. `].join('')//.split('. ')
    // const response = resp.map((response,index)=>{
    //     return <p className={`${resp.join('').length > 150 && 'big-response'}`} key={index}>{`${response}`}</p>
    // })
    return(
        <div className={'dash'}>
            <div className='displayed-post'>
                {/* https://images.unsplash.com/photo-1492681290082-e932832941e6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80 */}
                {/* https://images.unsplash.com/photo-1554151228-14d9def656e4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=633&q=80 */}
                <img src={'https://images.unsplash.com/photo-1438283173091-5dbf5c5a3206?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'} alt='whoops' />
                <section className='displayed-post-text'>
                    <p className={`${resp.length > 150 && 'medium-response'} ${resp.length>210 && 'big-response'}`}>{resp}</p>
                    {/* {response} */}
                </section>
            </div>
            
        </div>
    )
}
export default Dash;