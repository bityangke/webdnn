/// <reference path="../graph_descriptor/graph_descriptor.ts" />

namespace WebDNN {
    /**
     * `DescriptorRunner` executes computation based on `GraphDescriptor`.
     */
    export interface DescriptorRunner {
        backend: string;

        /**
         * Fetch descriptor from specified directory.
         * @param directory directory where descriptor is contained.
         * You can also provide URL of other domain like this.
         *
         * ```javascript
         * await runner.load('://my.other.domain.com/my_model');
         * ```
         *
         * However sometimes it can't because of Cross-Origin-Resource-Security policy.
         *
         * @param progressCallback callback which is called to notice the loading is progressing.
         */
        load(directory: string, progressCallback?: (loaded: number, total: number) => any): Promise<void>;

        /**
         * set descriptor.
         * @param descriptor descriptor which will be executed.
         */
        setDescriptor(descriptor: GraphDescriptor): void;

        /**
         * compile kernels.
         */
        compile(): Promise<void>;

        /**
         * load weight data
         * @param weightsData weights data
         */
        loadWeights(weightsData: Uint8Array): Promise<void>;

        /**
         * Run descriptor. You must call [[getInputViews]] and [[getOutputViews]] before calling this function.
         */
        run(): Promise<void>;

        /**
         * Get input ArrayBufferView object
         */
        getInputViews(): Promise<Float32Array[]>;

        /**
         * Get output ArrayBufferView object
         */
        getOutputViews(): Promise<Float32Array[]>;
    }
}
