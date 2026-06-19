import firstFrames from '../assets/first-frames.mp4';

export default function CarStage() {
  return (
    <div className="car-stage">
      <video
        className="car-stage__video"
        autoPlay
        muted
        playsInline
        loop
        src={firstFrames}
      />
    </div>
  );
}
