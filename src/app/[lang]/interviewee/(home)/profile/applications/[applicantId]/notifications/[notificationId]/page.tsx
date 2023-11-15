import React from "react";

import { Button, ButtonOutline } from "@/components";

const NotificationDetail = () => {
    return (
        <div className="bg-white px-32 py-10 rounded drop-shadow-lg flex flex-col items-center">
            <section>
                <h3 className="text-center text-xl font-semibold mb-2">
                    Xác nhận lịch ứng viên sẽ phỏng vấn
                </h3>
                <p className="text-center text-gray-500 mb-6">
                    Linear company - Software Engineer
                </p>

                <div className="mb-6">
                    <p className="text-sm text-neutral-700">
                        Worem ipsum dolor sit amet, consectetur adipiscing elit.
                        Etiam eu turpis molestie, dictum est a, mattis tellus.
                        Sed dignissim, metus nec fringilla accumsan, risus sem
                        sollicitudin lacus, ut interdum tellus elit sed risus.
                        Maecenas eget condimentum velit, sit amet feugiat
                        lectus. Class aptent taciti sociosqu ad litora torquent
                        per conubia nostra, per inceptos himenaeos. Praesent
                        auctor purus luctus enim egestas, ac scelerisque ante
                        pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus
                        nisl, eu tempor urna. Curabitur vel bibendum lorem.
                        Morbi convallis convallis diam sit amet lacinia. Aliquam
                        in elementum tellus. Curabitur tempor quis eros tempus
                        lacinia. Nam bibendum pellentesque quam a convallis. Sed
                        ut vulputate nisi. Integer in felis sed leo vestibulum
                        venenatis. Suspendisse quis arcu sem. Aenean feugiat ex
                        eu vestibulum vestibulum. Morbi a eleifend magna. Nam
                        metus lacus, porttitor eu mauris a, blandit ultrices
                        nibh. Mauris sit amet magna non ligula vestibulum
                        eleifend. Nulla varius volutpat turpis sed lacinia. Nam
                        eget mi in purus lobortis eleifend. Sed nec ante dictum
                        sem condimentum ullamcorper quis venenatis nisi. Proin
                        vitae facilisis nisi, ac posuere leo.
                    </p>
                </div>

                <div>
                    <ButtonOutline className="mr-4">Go back</ButtonOutline>
                    <Button>Go back</Button>
                </div>
            </section>
        </div>
    );
};

export default NotificationDetail;
