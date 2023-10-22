export default function Label({ header, subheader }: { header: string, subheader: string }) {
    return (
        <>
            <div className="label">
                <div className="label-header">{header}</div>
                <div className="label-subheader">{subheader}</div>
            </div>
            <style>{`
                .label {
                    margin-top: 100px;
                    text-align: center;
                    margin-bottom: 25px;
                }

                .label-header {
                    font-weight: 700;
                    font-size: 50px;
                }

                .label-subheader {
                    font-size: 30px;
                }
            `}</style>
        </>
    )
}
