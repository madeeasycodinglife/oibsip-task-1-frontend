const SectionWrapper = (Components, idName) => 
function HOC() {
    return(
        <>        
        <span className='hash-span' id={idName}>
            &nbsp;
        </span>
        <Components/>
        </>
    )
}


export default SectionWrapper