import React from "react"

export default function AudioFilePlayer(props) {
    // let name = props.name;
    // let id = props.id;
    // let s3_url = "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3";

    // const handleAudioPlay = (s3_url_link, state) => {
    //     var audio = new Audio(s3_url_link);
    //     if (state) {
    //         audio.play();
    //     } else {
    //         audio.pause();
    //     }
    // };

    // //no clue how to download
    // return (
    //     <div className="AudioFileListItem">
    //         <div className="AudioFileListElements">
    //             <a
    //                 href="javascript:void(0);"
    //                 onClick={()=>handleAudioPlay(s3_url, true)}
    //             >
    //                 <span className="AudioFilePlayButton">
    //                     <box-icon
    //                         name="play-circle"
    //                         color="#ffffff"
    //                         size="sm"
    //                     ></box-icon>
    //                 </span>
    //                 <span className="AudioFilePlayButtonTitle">Play</span>
    //             </a>
    //             {/* <a
    //                 href="javascript:void(0);"
    //                 // onClick={handleDownloadPlay(s3_url, true)}
    //             >
    //                 <span className="AudioFileDownloadButton">
    //                     <box-icon
    //                         name="download"
    //                         type="solid"
    //                         color="#ffffff"
    //                         size="sm"
    //                     ></box-icon>
    //                 </span>
    //                 <span className="AudioFileDownloadButtonTitle">
    //                     Download
    //                 </span>
    //             </a> */}
    //         </div>
    //     </div>
    // );
    let name = props.name;
    let id = props.id;
    let s3_url = "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3";

    const handleAudioPlay = (s3_url_link, state) => {
        var audio = new Audio(s3_url_link);
        if (state) {
            audio.play();
        } else {
            audio.pause();
        }
    };

    //no clue how to download
    return (
        <div className="AudioFileListItem">
            <div className="AudioFileListElements">
                <a
                    href="javascript:void(0);"
                    onClick={()=>handleAudioPlay(s3_url, true)}
                >
                    <span className="AudioFilePlayButton">
                        <box-icon
                            name="play-circle"
                            color="#ffffff"
                            size="sm"
                        ></box-icon>
                    </span>
                    <span className="AudioFilePlayButtonTitle">Play</span>
                </a>
            </div>
        </div>
    );
}