function TitleLogo({ position = "start" }: { position?: string }) {
  const variant: { [key: string]: string } = {
    start: "flex items-center justify-start space-x-4",
    middle: "flex items-center justify-center space-x-4",
    end: "flex items-center justify-end space-x-4",
  };
  return (
    <div className={variant[position]}>
      {/* <Logo /> */}
      <h1 className="text-2xl font-bold text-primary uppercase">Jobify</h1>
    </div>
  );
}

TitleLogo.defaultProps = {
  position: "start",
};

export default TitleLogo;
