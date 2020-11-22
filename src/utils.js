export function drawAxis(context, xAxis, yAxis) {
    for (let ax of [xAxis, yAxis]) {
        const [axisStart, axisEnd]  = ax;
        context.beginPath();
        context.strokeStyle = 'rgb(0,0,0)';
        context.moveTo(...axisStart);
        context.lineTo(...axisEnd);
        context.stroke();
    }
}