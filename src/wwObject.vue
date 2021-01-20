<template>
    <div class="ww-button">
        <wwObject v-if="content.hasLeftIcon && content.leftIcon" v-bind="content.leftIcon"></wwObject>
        <wwEditableText
            class="ww-button__text"
            :disabled="!canEditText"
            :value="content.text"
            :textStyle="textStyle"
            @input="updateText"
        ></wwEditableText>
        <wwObject v-if="content.hasRightIcon && content.rightIcon" v-bind="content.rightIcon"></wwObject>
    </div>
</template>

<script>
export default {
    name: '__COMPONENT_NAME__',
    wwDefaultContent: {
        text: {
            en: 'My button',
        },
        fontSize: wwLib.responsive('16px'),
        fontFamily: wwLib.responsive(''),
        textAlign: wwLib.responsive(''),
        color: wwLib.responsive(''),
        backgroundColor: wwLib.responsive(''),
        textTransform: wwLib.responsive(''),
        textShadow: wwLib.responsive(''),
        lineHeight: wwLib.responsive(''),
        wordSpacing: wwLib.responsive(''),
        hasRightIcon: false,
        hasLeftIcon: false,
    },
    props: {
        content: Object,
        wwElementState: Object,
        /* wwManager: start */
        wwEditorState: Object,
        /* wwManager: end */
    },
    computed: {
        canEditText() {
            /* wwManager:start */
            return (
                this.wwEditorState.editMode === wwLib.wwEditorHelper.EDIT_MODES.EDITION && this.wwEditorState.isSelected
            );
            /* wwManager:end */
            /* wwFront:start */
            // eslint-disable-next-line no-unreachable
            return false;
            /* wwFront:end */
        },
        textStyle() {
            return {
                fontSize: this.content.fontSize,
                fontFamily: this.content.fontFamily,
                textAlign: this.content.textAlign,
                color: this.content.color,
                backgroundColor: this.content.backgroundColor,
                textTransform: this.content.textTransform,
                textShadow: this.content.textShadow,
                lineHeight: this.content.lineHeight,
                wordSpacing: this.content.wordSpacing,
            };
        },
    },
    methods: {
        updateText(text) {
            this.$emit('update', { text });
        },
    },
    watch: {
        'content.hasRightIcon': {
            async handler(hasRightIcon) {
                if (hasRightIcon && !this.content.rightIcon) {
                    const uid = await wwLib.wwObjectHelper.create('ww-icon');
                    this.$emit('update', { rightIcon: { uid, isWwObject: true } });
                }
            },
        },
        'content.hasLeftIcon': {
            async handler(hasLeftIcon) {
                if (hasLeftIcon && !this.content.leftIcon) {
                    const uid = await wwLib.wwObjectHelper.create('ww-icon');
                    this.$emit('update', { leftIcon: { uid, isWwObject: true } });
                }
            },
        },
    },
};
</script>

<style lang="scss" scoped>
.ww-button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
}
</style>
