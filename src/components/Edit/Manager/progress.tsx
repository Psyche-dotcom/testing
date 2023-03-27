

export const ProgressBar = ({ percent = 75 }) => {
    return (
        //container
        <div>
            {/* color green */}
            <div style={{ width: percent }}></div>
        </div>
    )
}