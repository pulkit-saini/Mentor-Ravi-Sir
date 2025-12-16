const FloatingCircles = () => {
  // Reduced to 2 circles for better performance
  const circles = [
    { size: 80, color: "hsl(var(--primary))", left: "10%", delay: 0 },
    { size: 100, color: "hsl(var(--accent))", left: "75%", delay: 1.5 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <style>{`
        @keyframes floatUpOptimized {
          0% {
            transform: translate3d(0, 110vh, 0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 0.15;
          }
          90% {
            opacity: 0.15;
          }
          100% {
            transform: translate3d(0, -20vh, 0) scale(1.05);
            opacity: 0;
          }
        }
      `}</style>
      {circles.map((circle, index) => (
        <div
          key={index}
          className="absolute rounded-full"
          style={{
            width: circle.size,
            height: circle.size,
            background: `radial-gradient(circle, ${circle.color} 0%, transparent 70%)`,
            left: circle.left,
            filter: "blur(40px)",
            opacity: 0.15,
            animation: `floatUpOptimized ${30 + index * 5}s ease-in-out ${circle.delay}s infinite`,
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  );
};

export default FloatingCircles;
