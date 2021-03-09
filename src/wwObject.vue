<template>
    <div class="ww-button" :is="tag" :class="{ button: tag }">
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
    wwDefaultContent: {
        text: {
            en: 'My button',
        },
        hasRightIcon: false,
        hasLeftIcon: false,
        textAlign: wwLib.responsive(''),
        fontSize: wwLib.allowState(wwLib.responsive('16px')),
        fontFamily: wwLib.allowState(wwLib.responsive('')),
        color: wwLib.allowState(wwLib.responsive('')),
        backgroundColor: wwLib.allowState(wwLib.responsive('')),
        textTransform: wwLib.allowState(wwLib.responsive('')),
        textShadow: wwLib.allowState(wwLib.responsive('')),
        lineHeight: wwLib.allowState(wwLib.responsive('')),
        wordSpacing: wwLib.allowState(wwLib.responsive('')),
        fontWeight: wwLib.allowState(wwLib.responsive('')),
    },
    props: {
        content: Object,
        /* wwManager: start */
        wwEditorState: Object,
        /* wwManager: end */
    },
    computed: {
        canEditText() {
            /* wwManager:start */
            return (
                this.wwEditorState.editMode === wwLib.wwEditorHelper.EDIT_MODES.EDITION &&
                this.wwEditorState.isDoubleSelected &&
                !this.isTextBinded
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
                fontWeight: this.content.fontWeight,
            };
        },
        tag() {
            return this.content.buttonType ? 'button' : 'div';
        },
        /* wwManager:start */
        isTextBinded() {
            return this.wwEditorState.bindedProps['text'];
        },
        /* wwManager:end */
        attributes() {
            const type = this.content.buttonType;
            if (!type) {
                return {};
            }
            return { type };
        },
    },
    /* wwEditor:start */
    watch: {
        'content.hasRightIcon': {
            async handler(hasRightIcon) {
                if (this.wwEditorState.isACopy) {
                    return;
                }
                if (hasRightIcon && !this.content.rightIcon) {
                    const uid = await wwLib.wwObjectHelper.create('ww-icon');
                    this.$emit('update-effect', { rightIcon: { uid, isWwObject: true } });
                }
            },
        },
        'content.hasLeftIcon': {
            async handler(hasLeftIcon) {
                if (this.wwEditorState.isACopy) {
                    return;
                }
                if (hasLeftIcon && !this.content.leftIcon) {
                    const uid = await wwLib.wwObjectHelper.create('ww-icon');
                    this.$emit('update-effect', { leftIcon: { uid, isWwObject: true } });
                }
            },
        },
        canEditText() {
            const bordersStyle = {
                width: 'calc(100% + 8px)',
                height: 'calc(100% + 8px)',
                top: '-4px',
                left: '-4px',
                border: '4px solid var(--ww-color-blue-200)',
            };
            this.$emit('change-menu-visibility', this.wwEditorState.isSelected && !this.canEditText);
            this.$emit('change-borders-style', this.canEditText ? bordersStyle : {});
        },
    },
    /* wwEditor:end */
    methods: {
        updateText(text) {
            this.$emit('update', { text });
        },
    },
};
</script>

<style lang="scss" scoped>
.ww-button {
    display: flex;
    justify-content: center;
    align-items: center;
    &.button {
        outline: none;
        border: none;
        background: none;
        font-family: inherit;
        font-size: inherit;
    }
}
</style>
