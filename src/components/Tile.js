export default function Tile ({index, pos, onClick}) {
    const top = pos[0]*100 + 5;
    const left = pos[1]*100 + 5;
    const bgLeft = (index%4)*100 + 5;
    const bgTop = Math.floor(index/4)*100 + 5;
  
    return <div 
      className='tile'
      onClick={onClick}
      style={{top, left, backgroundPosition: `-${bgLeft}px -${bgTop}px`}} 
    >{index+1}</div>;
  }